load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_timer.js');

print("Program start!!!!!!!!!!!!!!!!");
let f = ffi('void test_on(int)');
f(4);
let led = ffi('int get_led_gpio_pin()')();

let getInfo = function() {
  return JSON.stringify({total_ram: Sys.total_ram(), free_ram: Sys.free_ram()});
};

// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);

Timer.set(1000 /* 1 sec */, true /* repeat */, function() {
  let value = GPIO.toggle(led);
  print(value ? 'Tick' : 'Tock', 'uptime:', Sys.uptime(), getInfo());
}, null);

// Publish to MQTT topic on a button press. Button is wired to GPIO pin 0
GPIO.set_button_handler(0, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  let topic = '/devices/' + Cfg.get('device.id') + '/events';
  let message = getInfo();
  let ok = MQTT.pub(topic, message, 1);
  print('Published:', ok ? 'yes' : 'no', 'topic:', topic, 'message:', message);
}, null);
//let i = ffi('void mgos_gpio_set_mode(int, bool)')(4,1);
//i(4,1);
//let f = ffi('void mgos_gpio_write(int, bool)')(4,1);
//f(4,1);

