# QR Print Seva — Windows Desktop Print Agent 🖨️
> आधिकारिक विंडोज ऑटो-प्रिंट डेस्कटॉप सॉफ्टवेयर (Cyber Cafe, CSC & Xerox Center)

यह सॉफ्टवेयर साइबर कैफे, सीएससी जन सेवा केंद्र और ज़ेरॉक्स दुकानों के विंडोज कंप्यूटर (Windows 7 / 10 / 11) पर चलता है।

---

## 🌟 मुख्य खासियतें (Key Features):

1. **5 प्रिंटर स्लॉट सपोर्ट (5 Dedicated Printer Slots):**
   - **Black & White Printer:** (e.g., HP LaserJet 1020 / M1005 / Canon LBP2900) - Normal / High quality
   - **Color Printer:** (e.g., Epson L3210 / L3150 / Brother) - Normal / High quality
   - **Duplex Printer (Two-Sided):** Auto Duplex vs Manual Two-Sided Flip
   - **A3 Printer:** बड़े पेपर के लिए A3 Normal / High
   - **4x6 Photo Printer:** (e.g., Epson L805 / L8050) - Borderless Studio Photo

2. **काउंटर अप्रूवल स्विच (Counter Approval Mode):**
   - **Auto-Print ON:** ग्राहक द्वारा UPI पेमेंट करते ही प्रिंटर से साइलेंट प्रिंट खुद निकल जाता है।
   - **Counter Approval ON:** पहले काउंटर ऑपरेटर स्क्रीन पर डबल-क्लिक करके अप्रूव करेगा, तभी प्रिंट निकलेगा।

3. **प्रिंट रेट सेटिंग (Print Pricing Configuration):**
   - B&W प्रति पेज रेट (₹3)
   - Color प्रति पेज रेट (₹10)
   - 4x6 Photo रेट (₹30)
   - A3 रेट (₹15)
   - सॉफ्टवेयर में रेट बदलते ही ग्राहक के मोबाइल पर नया रेट तुरंत लाइव दिखने लगता है!

4. **ज़ीरो-स्टोरेज प्राइवेसी गारंटी (Strict Zero-Storage):**
   - प्रिंट निकलते ही फाइल कंप्यूटर के रैम और डिस्क से स्थायी रूप से डिलीट हो जाती है। आधार कार्ड या मार्कशीट कभी सेव नहीं रहती।

---

## 🚀 1-क्लिक में .exe सॉफ्टवेयर कैसे बनाएं (How to Build .exe):

### विधि 1: विंडोज़ पर बैच फाइल चलाएं
- `print-agent` फोल्डर में मौजूद `build_exe.bat` पर डबल-क्लिक करें।
- यह अपने आप PyInstaller इनस्टॉल करेगा और `dist/QR-Print-Seva-Agent.exe` बना देगा।

### विधि 2: कमांड लाइन (Command Line)
```bash
cd print-agent
pip install pyinstaller
python build_exe.py
```
कुछ ही सेकंड में आपका **`dist/QR-Print-Seva-Agent.exe`** तैयार हो जाएगा!

---

## 🛠️ इनस्टॉल और चलाने का तरीका (How Shopkeepers Use It):
1. **डाउनलोड करें:** दुकानदार वेबसाइट से `QR-Print-Seva-Agent.exe` डाउनलोड करेगा।
2. **शॉप आईडी दर्ज करें:** अपना Shop ID (जैसे `DEMO_FE8F53D1` या `SHOP-XXXX`) डालेगा।
3. **प्रिंटर चुनें:** सॉफ्टवेयर खुद ब खुद कंप्यूटर से जुड़े सभी HP, Canon, Epson प्रिंटर ढूंढ लेगा।
4. **सेटिंग्स सेव करें:** "Save Settings" दबाएं।
5. **प्रिंट शुरू:** अब ग्राहक जब भी काउंटर का QR कोड स्कैन करके प्रिंट भेजेगा, कंप्यूटर में 'डिंग!' की घंटी बजेगी और साइलेंट प्रिंट बाहर आ जाएगा!
