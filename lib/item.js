// ----------------------------------------------------------------------------
// Constructor

Item = function () {
  this._name = null;
  this._expDate = null;
};


Item.prototype = {

  // --------------------------------------------------------------------------
  // EJSON methods

  constructor: Item,
  
  clone: function() {
    var anotherItem = new Item();
    anotherItem.setName(this._name);
    anotherItem.setExpDate(this._expDate);
    return anotherItem;
  },

  equals: function(other) {
    if (!(other instanceof Item)) { return false; }
    return EJSON.stringify(this) == EJSON.stringify(other);
  },

  toJSONValue: function() {
    return  {
      _name: this._name,
      _expDate: this._expDate
    };
  },

  toString: function() {
    var str = "";
    str += "name: " + this._name;
    str += "|";
    str += "exp date: " + this._expDate; 
    return str;
  },

  typeName: function() {
    return "Item";
  },

  // --------------------------------------------------------------------------
  // Setter methods

  setExpDate: function (expDate) {
    var date_regex = /^\d{4}\-\d{2}\-\d{2}$/;
    //console.log("hello: " + expDate);
    if (expDate === null || !date_regex.test(expDate)) { return; }
    this._expDate = expDate;
  },

  setName: function (name) {
    if (!name || name.length < 1) { return; }
    this._name = name.trim().toLowerCase();
  },
  
  // --------------------------------------------------------------------------
  // Getter methods
  
  getExpDate: function () {
    return this._expDate;
  },

  getName: function () {
    return this._name;
  },

  // --------------------------------------------------------------------------
  // API methods

  isValidItem: function () { 
    return (this._name !== null) && (this._expDate !== null);
  },

  clear: function () { 
    this._name = null; 
    this._expDate = null;
  }
};

// To read about EJSON
// https://www.eventedmind.com/feed/meteor-what-is-ejson
EJSON.addType("Item", function fromJSONValue(value) {
  var item = new Item();
  item.setName(value._name);
  item.setExpDate(value._expDate);
  return item;
});
