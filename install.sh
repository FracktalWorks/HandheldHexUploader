#!/bin/sh

cat > "/etc/X11/xinit/xinitrc" <<EOF
# /etc/X11/xinit/xinitrc
#
# global xinitrc file, used by all X sessions started by xinit (startx)

# cd /home/pi/Julia2018Octoprint/venv/lib/python2.7/site-packages/octoprint_Julia2018ExtendedTouchUI
# sudo chmod +x Main.py
# sudo python Main.py
# #sudo xinput_calibrator

# Run server
cd /home/pi/HandheldHexUploader
sudo npm run prod &
sleep 8s

# Start chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences
chromium-browser --window-size=480,320 --window-position=0,0 --start-fullscreen --no-sandbox --kiosk --incognito  --noerrdialogs --disable-translate --disable-infobars http://localhost:3000/ &

# invoke global X session script
. /etc/X11/Xsession

EOF

echo "Rebooting now...."
reboot now