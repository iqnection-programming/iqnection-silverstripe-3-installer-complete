<?php

	class Page extends SiteTree 
	{
			
		public function onBeforeWrite()
		{
			$this->extend('hook_onBeforeWrite', $this);
			parent::onBeforeWrite();
		}
	
	}

	class Page_Controller extends ContentController 
	{
		
		public $templates;
	
		public function init() {
			parent::init();
		}
		
	}