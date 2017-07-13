#include "fw/src/mgos.h"
#include <stdio.h>
#include "mjs.h"

#define LED_GPIO 2 /* No LED on DevKitC, use random GPIO close to GND pin */

int get_led_gpio_pin(void) {
  return LED_GPIO;
}

enum mgos_app_init_result mgos_app_init(void) {
  return MGOS_APP_INIT_SUCCESS;
}

