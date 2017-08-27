/*----------------------------------------------------------------------*

 *----------------------------------------------------------------------*/

#include <Button.h>        //https://github.com/JChristensen/Button
#include "Keyboard.h"

#define BUTTON_PIN 5       //Connect a tactile button switch (or something similar)
#define PULLUP1 true        
#define INVERT1 true

#define sensorPIN 7
#define PULLUP2 false
#define INVERT2 true
                           
                           
#define DEBOUNCE_MS 20     //A debounce time of 20 milliseconds usually works well for tactile button switches.
#define buttonLED 6         

Button resetButton(BUTTON_PIN, PULLUP1, INVERT1, DEBOUNCE_MS);    //Declare the button
Button sensor(sensorPIN, PULLUP2, INVERT2, DEBOUNCE_MS);    //Declare the button


void setup(void)
{
  Serial.begin(9600);
  pinMode(buttonLED, OUTPUT);    //Set the LED pin as an output

  delay(5000);  //incase I have trouble reprogramming in keyboardmode
  Keyboard.begin();
}

void loop(void)
{
    resetButton.read();                    //Read the button
    sensor.read();
    
    if (resetButton.wasPressed()) {       //If the button was released, change the LED state
      digitalWrite(buttonLED, LOW);
      //Serial.println("pressed");
      Keyboard.press('r');
      delay(100);
      Keyboard.releaseAll();
      delay(300);
    }
    
    if (sensor.wasPressed()) {       //If the button was released, change the LED state
      digitalWrite(buttonLED, HIGH);
      //Serial.println("pressed");
      Keyboard.press('a');
      delay(100);
      Keyboard.releaseAll();
      delay(300);
    }
}


