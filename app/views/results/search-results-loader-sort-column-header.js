import ResultsLoaderSortColumnHeaderView from "./results-loader-sort-column-header";
import Ember from "ember";

var SearchResultsLoaderSortColumnHeaderView = ResultsLoaderSortColumnHeaderView.extend({
	tagName: 'div',
	classNameBindings: [":sortable", "isAscending:ascending", "isDescending:descending", "isUnsorted:unsorted"],

	sortField: Ember.computed.oneWay("resultsLoader.sortField"),
	sortDirection: Ember.computed.oneWay("resultsLoader.sortDirection"),

	isUnsorted: Ember.computed.not("isCurrentColumn"),
	isCurrentColumn: function() {
		return this.get("field") === this.get("sortField");
	}.property("field", "sortField"),

	isAscending: function() {
		return this.get("isCurrentColumn") && this.get("sortDirection") === "asc";
	}.property("isCurrentColumn", "sortDirection"),

	isDescending: function() {
		return this.get("isCurrentColumn") && this.get("sortDirection") === "desc";
	}.property("isCurrentColumn", "sortDirection"),

	click: function(e) {
		var field = this.get("field");
		this.get("parentView.parentView").send(this.get("actionName"), field);
	}
});

export default SearchResultsLoaderSortColumnHeaderView;
