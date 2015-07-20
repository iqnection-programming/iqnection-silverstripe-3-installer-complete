<?php
	class HomePage extends Page {
	
		private static $db = array(
		);
		
		public function getCMSFields()
		{
			$fields = parent::getCMSFields();
			return $fields;
		}
	}
	
	class HomePage_Controller extends Page_Controller {	
		public function init() {
			parent::init();
		}
	}
