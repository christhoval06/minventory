// ----------------------------------------------------------------------------
// Constructor

Categoria = function () {
    this._name = null;
    this._description = null;
    this._itbms = null;
    this._active = null;
};


Categoria.prototype = {

    // --------------------------------------------------------------------------
    // EJSON methods

    constructor: Categoria,

    clone: function () {
        var o = new Categoria();
        o.setName(this._name);
        o.setDescription(this._description);
        o.setITBMS(this._itbms);
        o.setActive(this._active);
        return o;
    },

    equals: function (o) {
        if (!(o instanceof Categoria)) {
            return false;
        }
        return EJSON.stringify(this) == EJSON.stringify(o);
    },

    toJSONValue: function () {
        return {
            _name: this._name,
            _description: this._description,
            _active: this._active,
            _itbms: this._itbms
        };
    },

    toString: function () {
        var str = "";
        str += "name: " + this._name;
        str += "|";
        str += "description: " + this._description;
        str += "|";
        str += "itbms: " + this._itbms;
        return str;
    },

    typeName: function () {
        return "Categoria";
    },

    // --------------------------------------------------------------------------
    // Setter methods

    setDescription: function (description) {
        if (!description || description.length < 1) return;
        this._description = description;
    },

    setName: function (name) {
        if (!name || name.length < 1) return;
        this._name = name.trim();
    },
    setITBMS: function (i) {
        this._itbms = Number(i) ? Number(i) : 0;
    },
    setActive: function (active) {
        this._active = active;
    },

    // --------------------------------------------------------------------------
    // Getter methods

    getDescription: function () {
        return this._description;
    },

    getName: function () {
        return this._name;
    },

    getITBMS: function () {
        return this._itbms;
    },

    getActive: function () {
        return this._active;
    },

    // --------------------------------------------------------------------------
    // API methods

    isValidCategoria: function () {
        return (this._name !== null) && (this._description !== null);
    },

    clear: function () {
        this._name = null;
        this._description = null;
        this._itbms = null;
        this._active = null;
    }
};

// To read about EJSON
// https://www.eventedmind.com/feed/meteor-what-is-ejson
EJSON.addType("Categoria", function fromJSONValue(v) {
    var c = new Categoria();
    c.setName(v._name);
    c.setDescription(v._description);
    c.setITBMS(v._itbms);
    c.setActive(v._active)
    return c;
});
