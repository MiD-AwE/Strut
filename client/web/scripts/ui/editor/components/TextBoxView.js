// Generated by CoffeeScript 1.2.1-pre
/*
@author Tantaman
*/

define(["./ComponentView", "../Templates"], function(ComponentView, Templates) {
  var styles;
  styles = ["family", "size", "weight", "style", "color", "decoration"];
  return ComponentView.extend({
    className: "component textBox",
    tagName: "div",
    events: function() {
      var myEvents, parentEvents;
      parentEvents = ComponentView.prototype.events.call(this);
      myEvents = {
        "dblclick": "dblclicked",
        "editComplete": "editCompleted"
      };
      return _.extend(parentEvents, myEvents);
    },
    initialize: function() {
      var style, _i, _len, _results;
      ComponentView.prototype.initialize.apply(this, arguments);
      _results = [];
      for (_i = 0, _len = styles.length; _i < _len; _i++) {
        style = styles[_i];
        _results.push(this.model.on("change:" + style, this._styleChanged, this));
      }
      return _results;
    },
    dblclicked: function(e) {
      this.$el.addClass("editable");
      this.$el.find(".content").attr("contenteditable", true);
      this.allowDragging = false;
      return this.editing = true;
    },
    editCompleted: function() {
      var text;
      text = this.$textEl.text();
      this.editing = false;
      if (text === "") {
        return this.remove();
      } else {
        console.log("ALLOWING DRAGGING");
        this.model.set("text", text);
        this.$el.find(".content").attr("contenteditable", false);
        return this.allowDragging = true;
      }
    },
    _styleChanged: function(model, style, opts) {
      var key, value, _ref, _results;
      _ref = opts.changes;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        if (value) {
          if (key === "decoration") {
            console.log("DECORATION CHANGE");
            key = "textDecoration";
          } else if (key !== "color") {
            key = "font" + key.substr(0, 1).toUpperCase() + key.substr(1);
          }
          _results.push(this.$el.css(key, style));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    render: function() {
      ComponentView.prototype.render.call(this);
      this.$textEl = this.$el.find(".content");
      this.$el.css({
        fontFamily: this.model.get("family"),
        fontSize: this.model.get("size"),
        fontWeight: this.model.get("weight"),
        fontStyle: this.model.get("style"),
        color: "#" + this.model.get("color"),
        top: this.model.get("y"),
        left: this.model.get("x")
      });
      return this.$el;
    }
  });
});
