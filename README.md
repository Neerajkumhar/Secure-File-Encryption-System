# Secure File Encryption System

This project is a full-stack **Secure File Encryption System** built for a Cyber Security Lab academic demonstration. It allows users to securely encrypt and decrypt files using a password-based AES encryption system.

## 🚀 Features

- **File Encryption**: Encrypt any file format into a secure `.enc` format.
- **File Decryption**: Restore encrypted files to their original state using the correct password.
- **AES-256 Symmetric Encryption**: Utilizes standard symmetric-key cryptography (AES-CBC mode).
- **Secure Key Generation**: Passwords are mathematically hashed combined with a random "salt" to generate robust encryption keys.
- **Modern User Interface**: Responsive side-by-side dashboard (or tabbed on mobile) built with React and TailwindCSS.
- **Local Operation**: Files are securely processed on the backend and sent straight back.

---

## 💻 Tech Stack

### Frontend 
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Languages**: JavaScript, JSX, CSS, HTML

### Backend
- **Framework**: Python Flask
- **Encryption Library**: Cryptography (Python package `cryptography`)
- **API Configuration**: Flask-CORS for Cross-Origin Resource Sharing
- **Languages**: Python 3

---

## 🔄 Workflow

### Encryption Workflow
1. **User Input:** A user uploads a file and enters a string password on the React frontend.
2. **Transfer:** The file and password are sent to the Flask backend via an API `POST` request using `multipart/form-data`.
3. **Key Derivation Engine:** The backend generates a random 16-byte *Salt*. It hashes the password strictly 100,000 times (PBKDF2HMAC algorithm) combined with this salt to yield a robust 32-byte (256-bit) encryption key setup.
4. **AES-256 Processing:** The backend generates a random 16-byte Initialization Vector (IV). The file's bytes are encrypted using the derived key and IV inside an AES-256-CBC cipher block.
5. **Formatting:** The Salt and the IV are prepended to the final cipher bytes so the key can be reproduced upon decryption securely.
6. **Return:** The encrypted file blob is returned dynamically and prompted as a `.enc` download on the browser.

### Decryption Workflow
1. **User Input:** A user uploads a previously encrypted `.enc` file alongside the necessary password.
2. **Transfer to API:** Identical API POST operation to the backend `/decrypt` endpoint.
3. **Data Splitting:** The backend chops off the first 16 bytes representing the Salt, and the consecutive 16 bytes representing the IV. The remainder is treated as pure cipher text.
4. **Key Verification:** Using the exact same PBKDF2HMAC formulation over the newly found Salt and user-submitted password, a symmetric key is reproduced.
5. **Decryption:** The AES-256-CBC cipher decrypts and un-pads the cipher text resolving to the original bytes. 
6. **Download:** The successful blob is returned to the user, omitting the `.enc` extension mapping. 

---

## 🛠️ How to Make It (Installation & Run Guide)

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Python 3.10+](https://www.python.org/downloads/) installed

### 1. Setup the Backend
Open a terminal in the project directory and navigate to the backend folder:
```bash
cd backend
```

Create and activate a virtual environment (optional but recommended):
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

Install the required Python modules:
```bash
pip install -r requirements.txt
```

Run the Flask server:
```bash
python app.py
```
*The API will start running on `http://localhost:5000`*

### 2. Setup the Frontend
Open a **new** terminal window and navigate to the frontend folder:
```bash
cd frontend
```

Install the node modules and dependencies:
```bash
npm install
```

Start the Vite development engine:
```bash
npm run dev
```

### 3. Usage
Navigate to `http://localhost:5173` (or the port specified by Vite) in your web browser. 
- Use the left panel to upload files and generate encrypted `.enc` items.
- Use the right panel to test decrypting those exact items back into their raw counterparts.
