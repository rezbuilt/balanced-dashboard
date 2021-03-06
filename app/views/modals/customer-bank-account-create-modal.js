import Ember from "ember";
import ModalBaseView from "./modal-base";
import Full from "./mixins/full-modal-mixin";
import Form from "./mixins/form-modal-mixin";
import Save from "./mixins/object-action-mixin";
import BankAccountValidatable from "balanced-dashboard/models/bank-account-validatable";

var CustomerBankAccountCreateModalView = ModalBaseView.extend(Full, Form, Save, {
	templateName: 'modals/customer-bank-account-create-modal',
	elementId: "add-bank-account",
	title: "Add a bank account",
	cancelButtonText: "Cancel",
	submitButtonText: "Add",

	bankAccountTypes: [{
		value: "checking",
		label: "Checking",
	}, {
		value: "savings",
		label: "Savings"
	}],

	model: function() {
		return BankAccountValidatable.create({
			name: '',
			account_number: '',
			routing_number: '',
			account_type: 'checking'
		});
	}.property(),

	isSaving: Ember.computed.oneWay("model.isSaving"),

	save: function() {
		var self = this;
		var fundingInstrument = this.get("model");
		return fundingInstrument
			.tokenizeAndCreate(this.get('customer.id'))
			.then(function(model) {
				self.close();
				return model;
			}, function(model) {
				return Ember.RSVP.reject();
			});
	},

	actions: {
		save: function() {
			var controller = this.get("controller");
			this.save()
				.then(function(model) {
					controller.transitionToRoute(model.get("route_name"), model);
				});
		}
	}
});

CustomerBankAccountCreateModalView.reopenClass({
	open: function(customer) {
		return this.create({
			customer: customer
		});
	}
});

export default CustomerBankAccountCreateModalView;
