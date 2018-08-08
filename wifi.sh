#!/bin/sh

if [[ -z "$1" || -z "$2" ]];	then
	echo "Parameter Error"
	exit 1
fi

cat > "/etc/wpa_supplicant/wpa_supplicant.conf" <<EOF
country=IN
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="$1"
  scan_ssid=1
  psk="$2"
}

EOF

ifdown --force wlan0
ifup --force wlan0