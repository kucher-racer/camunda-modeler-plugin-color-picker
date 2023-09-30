
module.exports = function (electronApp, menuState) {
  return [{
    label: 'Toggle Color Picker',
    accelerator: 'CommandOrControl+Q',
    enabled: function() {
      return true;
    },
    action: function() {
      electronApp.emit('menu:action', 'toggleColorPicker');
    }
  }];
}
