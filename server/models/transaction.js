const mongoose = require('mongoose');

const trxSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		listItem: [{
			type: Object,
			required: [ true, 'listItem is required' ]
		}],
		totalItem: {
			type: Number
		},
		totalPayment: {
			type: Number
        },
        deliveryStatus: {
            type: Boolean,
            default : false
		},
		statusTrx: {
			type: Boolean,
			default: true
		}
	},
	{
        versionKey: false,
        timestamps: true
	}
);


trxSchema.pre('save', function(next) {
    let totalItem = 0;
    let totalPayment = 0
	this.listItem.forEach(el => {
		totalPayment += el.sum
		totalItem += el.quantity
	})
    this.totalPayment = totalPayment
	this.totalItem = totalItem

	next();
});
const Transaction = mongoose.model('Transaction', trxSchema);

module.exports = Transaction;
