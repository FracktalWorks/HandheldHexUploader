# HandheldHexUploader
Mobile Marlin hex uploader for Manufacturing

---

## Install Node.js on Raspberry Pi 3
1. `sudo apt-get update`
2. `sudo apt-get dist-upgrade`
3. `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
4. `sudo apt-get install -y nodejs`
5. `node -v`

&nbsp;

## Install Chromium on Raspberry Pi 3
`sudo apt-get install chromium-browser`

&nbsp;

## Clone repo and install dependencies
1. `git clone https://github.com/FracktalWorks/HandheldHexUploader.git`
2. `cd HandheldHexUploader`
3. `npm i`
4. `sudo chmod +x install.sh`
5. `./install.sh`

---

## Development

### Start server
1. `npm test`
2. Load *https://localhost:3000/* in browser.

&nbsp;

### Chromium kiosk mode script
1. `sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium-browser/Default/Preferences`
2. `sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium-broswer/Default/Preferences`
3. `chromium-browser --kiosk --incognito --start-maximized --noerrdialogs --disable-translate --disable-infobars http://localhost:3000`
