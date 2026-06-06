const { db } = require('./config/firebase');
const { collection, getDocs, doc, updateDoc, getDoc, Timestamp } = require('firebase/firestore');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function emailCertificates() {
    try {
        console.log("📧 Starting Certificate Email Distribution...");

        const certificatesRef = collection(db, 'certificates');
        const snapshot = await getDocs(certificatesRef);

        console.log(`🔍 Found ${snapshot.size} certificates.`);

        let sentCount = 0;

        for (const certDoc of snapshot.docs) {
            const certData = certDoc.data();

            if (certData.emailSent) {
                continue;
            }

            const userRef = doc(db, 'users', certData.userId);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                console.log(`   ⚠️ User ${certData.userId} not found. Skipping.`);
                continue;
            }

            const userData = userSnap.data();
            const userEmail = userData.email;

            if (!userEmail) {
                console.log(`   ⚠️ No email for ${certData.userName}. Skipping.`);
                continue;
            }

            const mailOptions = {
                from: process.env.SMTP_FROM || 'CS Studio <noreply@csstudio.app>',
                to: userEmail,
                subject: `Your CS Studio Certificate – ${certData.courseTitle}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #4B5563;">🎉 Congratulations!</h1>
                        <p>Dear ${certData.userName},</p>
                        <p>We are thrilled to inform you that you have successfully completed <strong>${certData.courseTitle}</strong>!</p>
                        <p><strong>Certificate ID:</strong> ${certData.certificateId}</p>
                        <p><strong>Issued on:</strong> ${certData.issuedAt?.toDate().toDateString() || new Date().toDateString()}</p>
                        <p>
                            <a href="${certData.verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0;">
                                Verify Certificate
                            </a>
                        </p>
                        ${certData.pdfUrl ? `<p><a href="${certData.pdfUrl}" style="color: #3B82F6;">Download PDF Certificate</a></p>` : ''}
                        <p>Share your achievement with the world!</p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #E5E7EB;">
                        <p style="font-size: 12px; color: #6B7280;">
                            Best regards,<br>
                            The CS Studio Team
                        </p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);

            const certRef = doc(db, 'certificates', certDoc.id);
            await updateDoc(certRef, {
                emailSent: true,
                emailSentAt: Timestamp.now()
            });

            console.log(`    ✅ Email sent to ${userEmail}`);
            sentCount++;
        }

        console.log(`\n🎉 Email Distribution Complete! Sent: ${sentCount}`);
        process.exit(0);

    } catch (error) {
        console.error("❌ Error emailing certificates:", error);
        process.exit(1);
    }
}

emailCertificates();
