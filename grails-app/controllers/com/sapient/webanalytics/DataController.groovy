package com.sapient.webanalytics

import grails.converters.JSON

class DataController {
	
	def rest

    def analytics() {
		def json = request.JSON
		println "request JSON is " + request.JSON
		log.info("analytics() json : ${json}");
		//String user = json.userName;
		Analytics analytics = new Analytics()
		analytics.success = true
		render analytics as JSON

	}
}
