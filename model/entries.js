const {Schema, model} = require("mongoose");

const entriesSchema = new Schema({
    userId: {
      type: String,
      ref: 'User',
      required: true
    },
    entries: [{
        timestamp: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        cur_plan: {
            cold_plan: {
                type: Number,
                required: true
            },
            hot_plan: {
                type: Number,
                required: true
            },
            day_plan: {
                type: Number,
                required: true
            },
            night_plan: {
                type: Number,
                required: true
            }
        },
        meters: {
            cold: {
                type: Number,
                required: true
            },
            hot: {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            },
            night: {
                type: Number,
                required: true
            }
        },
        price: {
            type: Number,
            required: true,
            default: 0
        }
    }]
});

module.exports = model("Entries", entriesSchema);