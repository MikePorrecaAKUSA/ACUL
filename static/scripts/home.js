var Page = function(){};

Page.prototype.InitPage = function(){
	this.InitEvents();
	this.GetTemplates("home.handlebars");
	this.LoadAccounts();	
	//this.LoadOffers();

};

Page.prototype.InitEvents = function(){
	var that = this;
	$("body").on("click", ".actionTrigger", function(){
		var jElem = $(this);
		var action = jElem.attr("data-action");	
	});	
};

Page.prototype.GetTemplates = function(name){
	var that = this;
	$.ajax({
		url: "/templates/" + name,
		cache: true
	}).done(function(data) {		
		$("#templates_area").html(data);	
		that.LoadOffers();
	});
};

Page.prototype.LoadAccounts = function(){
	var user_id = $("#desktop").attr("u");
	$.ajax({
		url: "/api/getaccounts",
		data: {
			id: user_id
		},
		method: "POST",
		cache: false
	}).done(function(data) {
		var source = $("#personal-accounts-template").html();
		var template = Handlebars.compile(source);
		var context = {accounts: data};
		$("#accounts_container").append(template(context));
	});
};

Page.prototype.LoadOffers = function(){	
	var source = $("#offers-hub-main").html();
	var template = Handlebars.compile(source);
	$("#offers_container").append(template({}));	
};


var page = new Page();

$(document).ready(function(){
	page.InitPage();
	console.log('test');
});