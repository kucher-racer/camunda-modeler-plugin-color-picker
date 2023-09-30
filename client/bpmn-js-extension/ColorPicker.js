var domify = require('min-dom/lib/domify');

export default function ColorPicker(eventBus, canvas, editorActions, commandStack) {
  var self = this;
  this.commandStack = commandStack;

  editorActions.register({
    toggleColorPicker: function() {
      self.toggle(canvas);
    }
  });

  eventBus.on('selection.changed', function(element) {
    self.selectedElement = element.newSelection[0];
  });

}

ColorPicker.prototype.toggle = function(canvas) {
  if (this.isActive) {
    document.getElementById('colorpicker').remove();
    this.isActive = false;
  } else {
    this.isActive = true;
    this.addColorPicker(canvas.getContainer().parentNode);
  }
};

ColorPicker.prototype.addColorPicker = function(container) {
  var self = this;
  var markup = '<div id="colorpicker" class="colorpicker-container"></div>';
  var element = domify(markup);

  container.appendChild(element);

  window.$ = require('jquery');
  require('evol-colorpicker');

  $(element).colorpicker({
    hideButton: true,
    history: false,
    strings: ",,"

  });

  $(element).on("change.color", function(event, color){
    if (self.selectedElement != null) {
      self.commandStack.execute('element.setColor', {
        elements: [self.selectedElement],
        colors: { fill: color }
      });
    }
  });
};



ColorPicker.$inject = ['eventBus', 'canvas', 'editorActions', 'commandStack'];


