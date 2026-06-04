import fitz  # PyMuPDF
import sys

def extract_pdf(pdf_path, txt_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    
    with open(txt_path, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"Extracted {doc.page_count} pages to {txt_path}")

if __name__ == "__main__":
    extract_pdf('notes/C_notes.pdf', 'notes/C_notes_extracted.txt')
