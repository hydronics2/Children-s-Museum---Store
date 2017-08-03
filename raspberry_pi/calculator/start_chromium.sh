
#notes:

#apt-get install unclutter
#apt-get install xdotool

#put in home directory... seems to work best there!
#sudo mv start_chromium.sh /home/pi/
#sudo apt-get install dos2unix (this is to change wierd windows characters to unix compatiable as needed)
#dos2unix start_chromium.sh

#
#chmod 755 start_chromium.sh
#

# Run browser after boot to desktop
/bin/sleep 3
sudo -u pi chromium-browser --kiosk --incognito /home/pi/PCM/raspberry_pi/calculator/index.html &
# End of script


# Now your scripts are for sure executable.  ;) Next the autostart file needs to be modified to make use of our scripts and the following commands added to the end of the file and in the specific order you see them here:
# nano /home/pi/.config/lxsession/LXDE-pi/autostart ....................in lieu of /etc/xdg/lxsessions/LXDE-pi/autostart
#no @ sign needed
# /home/pi/start_chromium.sh

#Now don't close the file just yet, you need to comment out one line with a #, so edit to look like this:
# @xscreensaver -no-splash

# Finally there is one last thing that bugged me about how the pi started up. That goofy cartoon fruit splash screen. If you want to be rid if it you can edit it out by removing the word "splash" form the single command line in /boot/cmdline.txt file. To do that:
# sudo nano /boot/cmdline.txt
# and edit out the splash, then Ctrl-x to save and close the file.

#cp /etc/xdg/lxsession/LXDE-pi/autostart /home/pi/.config/lxsession/LXDE-pi/autostart
