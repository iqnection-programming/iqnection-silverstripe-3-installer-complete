<?
	function generateCode($word)
	{
		$len = strlen($word);
		$chars = array("@", "#", "*", "$", "!");
		
		$num1 = intval(substr(md5($word), 5, 1));
		$num1 = $num1 ? $num1 : 3;
		$num2 = intval(substr(md5($word), 8, 1));
		$num2 = $num2 ? $num2 : 6;
		$num3 = intval(substr(md5($word), 12, 1));
		$num3 = $num3 ? $num3 : 9;
		$word = md5($word);
		$word = substr($word, 0, $num1).strtoupper(substr($word, $num1, 1)).substr($word, $num1+1);
		$word = substr($word, 0, $num2).($chars[$num2 % count($chars)]).substr($word, $num2+1);
		$word = substr($word, 0, $num3).strtoupper(substr($word, $num3, 1)).substr($word, $num3+1);
		
		while (preg_match("/^\d/", $word)) $word = substr($word, 1);

		$i = 0;
		$word = preg_replace("/([a-zA-Z])/e", "chr(ord(\\1) + ((strlen(\$word) * (\$i++)) % 20))", $word);
		$word = preg_replace("/^\W/", chr(preg_match_all("/\d/", $word, $matches) + 97), $word);
		
		$word = substr($word, 0, 14);
		return ($word);
	}
	
	function referSecurityCheck()
	{
		$refer = $_SERVER['HTTP_REFERER'];
		$server = $_SERVER['SERVER_NAME'];
		$cr = explode(".", preg_replace("/^http[s]?:\/\/([^\/]+).*$/i", "\\1", $refer));
		$cs = explode(".", $server);
		
		$r = $cr[count($cr)-2].".".$cr[count($cr)-1];
		$s = $cs[count($cs)-2].".".$cs[count($cs)-1];
		
		return ($r == $s);
	}
	
	function validateAjaxCode()
	{
		list($code1, $code2) = explode("|", trim($_REQUEST['nospam_codes']));
		unset($_REQUEST['nospam_codes'], $_POST['nospam_codes']);
		
		list($x, $time) = explode(".", $code1);
		
		$time = substr($time, 0, strlen($time)-3);
		$diff = time() - floatval($time);
	
		if (referSecurityCheck() && $diff < (60 * 60 * 8))	// 8 hour timeout
		{
			return (generateCode($code1) == $code2);
		}
		return false;
	}
	
	if ($_REQUEST['generate_code'])
	{
		if (referSecurityCheck())
		{
			print generateCode(trim($_REQUEST['generate_code']))."|".trim($_REQUEST['id']);
		}
	}
?>