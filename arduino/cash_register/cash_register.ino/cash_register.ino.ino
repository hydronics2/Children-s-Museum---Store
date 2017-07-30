/* This minimal example shows how to get single-shot range
measurements from the VL6180X.

The range readings are in units of mm. */

#include <Wire.h>
#include <VL6180X.h>

#define SCALING 2

VL6180X sensor;

const int buzzerPin = 10;

void setup() 
{
  pinMode(13,OUTPUT);
  Serial.begin(9600);
  Wire.begin();
  
  sensor.init();
  sensor.configureDefault();
  sensor.setScaling(SCALING);
  sensor.setTimeout(500);
}

void loop() 
{ 

  int range = sensor.readRangeSingleMillimeters();
  //Serial.println(range);
  if(range < 250){
    Serial.println(range);
    digitalWrite(13,HIGH);
    analogWrite(buzzerPin, 10);
    delay(100);
    digitalWrite(13,LOW);
    digitalWrite(buzzerPin, LOW);
    delay(500);
  }else{
    digitalWrite(13,LOW);
  }
  
  if (sensor.timeoutOccurred()) { Serial.print(" TIMEOUT"); }

}
