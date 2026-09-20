import QRCode from "qrcode";

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 320,
      margin: 1.5,
      color: {
        dark: "#050707",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });
  } catch (error) {
    console.error("QR Generation error:", error);
    return "";
  }
}
