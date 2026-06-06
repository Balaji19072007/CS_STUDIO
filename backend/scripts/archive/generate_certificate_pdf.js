const { db } = require('./config/firebase'); // Assuming existing config exports db
const { getStorage } = require('firebase-admin/storage'); // Assuming firebase-admin is setup
const { collection, getDocs, doc, updateDoc } = require('firebase/firestore');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure firebase-admin is initialized in your config (or initialize here if needed)
// Assuming './config/firebase' might be client SDK. For storage admin, we usually need admin SDK.
// But the user prompt says "Use existing Firebase config". 
// If client SDK is used, we can't upload to storage easily with Node.js without Admin SDK or Client SDK + Auth.
// Let's assume Admin SDK is available or we use a place-holder for "Upload" if Admin isn't configured.
// Given previous scripts, it seems we are using Client SDK (firebase/firestore).
// HOWEVER, "Upload PDF to Firebase Storage" usually implies Admin SDK in backend helpers.
// I will assume `firebase-admin` is initialized in `server.js` or similar and I can import it.
// If not, I will try to initialize it or mock the upload part if keys are missing.
// Actually, let's see package.json... `firebase-admin` IS there.
// I'll assume standard admin initialization.

const admin = require('firebase-admin');
// Check if app is initialized
if (admin.apps.length === 0) {
    // If we don't have credentials in this script context, this might fail. 
    // But I must output executable code.
    // I will assume GOOGLE_APPLICATION_CREDENTIALS or similar is set, 
    // or I'll try to rely on existing connection.
    try {
        const serviceAccount = require('./serviceAccountKey.json'); // Common pattern
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "cs-studio-app.appspot.com"
        });
    } catch (e) {
        // Fallback: Default init (might rely on env vars)
        admin.initializeApp();
    }
}

const bucket = admin.storage().bucket();

async function generatePDFs() {
    try {
        console.log("🚀 Starting Certificate PDF Generation...");

        const certificatesRef = collection(db, 'certificates');
        const snapshot = await getDocs(certificatesRef);

        console.log(`🔍 Found ${snapshot.size} certificates.`);

        for (const certDoc of snapshot.docs) {
            const certData = certDoc.data();

            // Skip if PDF already exists
            if (certData.pdfUrl) continue;

            console.log(`    📄 Generating PDF for ${certData.issuedTo || certData.userName}...`);

            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4'
            });

            // Buffer to store PDF
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));

            // Design
            // Background / Border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
                .strokeColor('#CCAA00')
                .lineWidth(5)
                .stroke();

            // Header
            doc.font('Helvetica-Bold').fontSize(40).fillColor('#333333')
                .text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center' });

            // Body
            doc.moveDown();
            doc.font('Helvetica').fontSize(20).fillColor('#555555')
                .text('This is to certify that', { align: 'center' });

            doc.moveDown();
            doc.font('Helvetica-Bold').fontSize(35).fillColor('#000000')
                .text(certData.userName, { align: 'center' });

            doc.moveDown();
            doc.font('Helvetica').fontSize(20).fillColor('#555555')
                .text('has successfully completed the course', { align: 'center' });

            doc.moveDown();
            doc.font('Helvetica-Bold').fontSize(30).fillColor('#4B5563')
                .text(certData.courseTitle, { align: 'center' });

            doc.moveDown();
            doc.fontSize(15).fillColor('#666666')
                .text(`Issued on: ${certData.issuedAt?.toDate().toDateString() || new Date().toDateString()}`, { align: 'center' });

            // Footer / ID
            doc.moveDown(4);
            doc.fontSize(12).text(`Certificate ID: ${certData.certificateId}`, { align: 'center' });
            doc.text(`Verify at: ${certData.verificationUrl}`, { align: 'center', link: certData.verificationUrl });

            doc.end();

            // Wait for stream to finish
            await new Promise((resolve) => doc.on('end', resolve));
            const pdfData = Buffer.concat(buffers);

            // Upload to Firebase Storage
            const filePath = `certificates/${certData.courseId}/${certData.certificateId}.pdf`;
            const file = bucket.file(filePath);

            await file.save(pdfData, {
                metadata: { contentType: 'application/pdf' },
                public: true
            });

            // Get Public URL
            // If bucket is public:
            // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
            // Or use signed URL if private (but typically certs are public-ish)

            // Assuming standard firebasestorage.googleapis.com link format for ease
            // Or just file.publicUrl() if available?
            // Let's use getSignedUrl for long expiry (e.g. 100 years) to mimic "permanent" link
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2100' // Far future
            });

            // Update Firestore
            const certRef = doc(db, 'certificates', certDoc.id);
            await updateDoc(certRef, {
                pdfUrl: url
            });

            console.log(`    ✅ PDF Generated & Uploaded: ${url}`);
        }

        console.log("\n🎉 All missing PDFs generated!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Error generating PDFs:", error);
        process.exit(1);
    }
}

generatePDFs();
