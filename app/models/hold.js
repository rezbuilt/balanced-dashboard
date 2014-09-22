import Transaction from "./transaction";

var Hold = Balanced.Transaction.extend({
	card: Balanced.Model.belongsTo('card', 'funding-instrument'),
	source: Ember.computed.alias('card'),
	debit: Balanced.Model.belongsTo('debit', 'debit'),

	status: function() {
		if (this.get('debit')) {
			return 'captured';
		} else if (this.get('voided_at')) {
			return 'void';
		} else if (this.get('is_expired')) {
			return 'expired';
		} else {
			return 'created';
		}
	}.property('debit', 'voided_at', 'is_expired'),

	is_expired: function() {
		return moment(this.get('expires_at')).toDate() < new Date();
	}.property('expires_at'),

	can_void_or_capture: Ember.computed.equal('status', 'created'),
	type_name: 'Hold',
	route_name: 'holds',
	funding_instrument_description: Ember.computed.readOnly('card.description'),
	customer: Balanced.computed.orProperties('debit.customer', 'card.customer'),
	last_four: Ember.computed.readOnly('card.last_four'),
	funding_instrument_name: Ember.computed.readOnly('card.brand'),
	funding_instrument_type: Ember.computed.alias('card.type_name')
});

export default Hold;
