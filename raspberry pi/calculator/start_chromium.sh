#notes:
#startup description: https://www.raspberrypi.org/forums/viewtopic.php?t=163316&p=1055788

#apt-get install unclutter
#apt-get install xdotool



#sudo nano start_chromium.sh
#add chromium-browser start command below
#sudo chmod 755 start_chromium.sh
#sudo chmod +x start_chromium.sh

# Run browser after boot to desktop
/bin/sleep 3
sudo -u pi chromium-browser --kiosk --incognito /home/pi/Portlands-Childrens-Museum---Grocery/raspberry\ pi/calculator/index.html &
# End of script


# Now your scripts are for sure executable.  ;) Next the autostart file needs to be modified to make use of our scripts and the following commands added to the end of the file and in the specific order you see them here:
# nano /home/pi/.config/lxsession/LXDE-pi/autostart
# @xset s off
# @xset s noblank
# @xset -dpms
# @unclutter -idle 5 -root
# @/home/pi/Portlands-Childrens-Museum---Grocery/raspberry\ pi/calculator/start_chromium.sh

#Now don't close the file just yet, you need to comment out one line with a #, so edit to look like this:
# @xscreensaver -no-splash

# Finally there is one last thing that bugged me about how the pi started up. That goofy cartoon fruit splash screen. If you want to be rid if it you can edit it out by removing the word "splash" form the single command line in /boot/cmdline.txt file. To do that:
# sudo nano /boot/cmdline.txt
# and edit out the splash, then Ctrl-x to save and close the file.

#cp /etc/xdg/lxsession/LXDE-pi/autostart /home/pi/.config/lxsession/LXDE-pi/autostart
