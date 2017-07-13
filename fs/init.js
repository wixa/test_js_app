load('api_config.js');
//load('api_gpio.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_timer.js');

//let f = ffi('void test(int, int)')(4,1);
//f(4,1);

let f = ffi('void mgos_gpio_write(int, bool)')(4,1);
f(4,1);
