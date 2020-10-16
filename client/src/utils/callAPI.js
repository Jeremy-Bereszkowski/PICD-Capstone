
class CallAPI {
  encrypt = (toEncode) => {
    const crypto = require('crypto'),
        resizedIV = Buffer.allocUnsafe(16),
        iv = crypto
            .createHash("sha256")
            .update(process.env.REACT_APP_IV_KEY)
            .digest();

    iv.copy(resizedIV);

    const key = crypto
        .createHash("sha256")
        .update(process.env.REACT_APP_CIPHER)
        .digest()

    const cipher = crypto.createCipheriv("aes256", key, resizedIV)
    const msg = []

    msg.push(cipher.update(toEncode, "binary", "hex"));
    msg.push(cipher.final("hex"));

    return msg.join("")
  }

  decrypt = (toDecode) => {
    const crypto = require('crypto'),
        resizedIV = Buffer.allocUnsafe(16),
        iv = crypto
            .createHash("sha256")
            .update(process.env.REACT_APP_IV_KEY)
            .digest();

    iv.copy(resizedIV);

    const key = crypto
        .createHash("sha256")
        .update(process.env.REACT_APP_CIPHER)
        .digest()

    const decipher = crypto.createDecipheriv("aes256", key, resizedIV)
    const msg = []

    msg.push(decipher.update(toDecode, "hex", "binary"));
    msg.push(decipher.final("binary"));

    return msg.join("")
  }
}

export default new CallAPI()
