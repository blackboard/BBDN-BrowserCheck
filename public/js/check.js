// Version 3.5
// 2-15-2016
// author: Shannon Meisenheimer, meisenheimer@ucmo.edu
// Compatiblity Requirements for Bb 2015Q4 Release

var browserAgent, browserUserAgent, browserVersion, browserPlatform, OSVersion, OSBit, platformVersion, safariVersion, browserPass, firefoxMin, firefoxMax, chromeMin, ChromeMax, ieMin, ieMax, safariMin,
safariMax, jreEnabled, jreVersions, tridentVersion, compatMode;

browserUserAgent = navigator.userAgent.toLowerCase();
browserAgent = 'Unknown Browser';
browserVersion = safariVersion = 'Unknown Version';
browserPlatform = 'Unknown Platform';
platformVersion = 'Unknown OS';
compatMode = false; // IE compatibility view token
jreEnabled = '<span style="color:#cc0000; font-weight:bold;">Disabled</span>';
jreVersions = '<span style="color:#cc0000; font-weight:bold;">Version Unknown</span>';

firefoxMin = 31.0; // Minimum stable version supported (generally what Bb tested the ServicePack on)
firefoxMax = 44.0; // Current stable version (supported as part of stable release channel)

chromeMin = 36.0; // Minimum stable version supported (generally what Bb tested the ServicePack on)
chromeMax = 48.0; // Current stable version (supported as part of stable release channel)

ieMin = 11.0; // Minimum version supported
ieMax = 11.0; // Maximum version supported

edgeMin = 20.0; // Minimum version supported
edgeMax = 21.0; // Maximum version supported

safariMin = 6.0; // Minimum version supported
safariMax = 9.0; // Maximum version supported

switch (true) // OSBitSwitch - Check for 64 or 32 bit
{
	case browserUserAgent.indexOf('wow64') >= 0:
		OSBit = '64';
		break;
	case browserUserAgent.indexOf('win64') >= 0:
		OSBit = '64';
		break;
	case browserUserAgent.indexOf('x64') >= 0:
		OSBit = '64';
		break;
} // End OSBitSwitch

switch (true) // AndroidOSSwitch - Check if platform is Android
{
	case browserUserAgent.indexOf('android') >= 0:
		browserPlatform = 'Android';
		platformVersion = browserUserAgent.split('android ');
		platformVersion = platformVersion[1].split(';');
		platformVersion = browserPlatform + ' ' + platformVersion[0];
		break;
} // End AndroidOSSwitch

switch (true) // iOSSwitch - Check if platform is iOS
{
	case browserUserAgent.indexOf('ipad') >= 0:
		browserPlatform = 'iOS';
		platformVersion = browserUserAgent.split('ipad;');
		platformVersion = platformVersion[1].split('os ', 2);
		platformVersion = platformVersion[1].split(' ', 1);
		platformVersion = browserPlatform + ' ' + platformVersion[0];
		if (/_/g.test(platformVersion))
		{
			platformVersion = platformVersion.replace(/_/g, '.');
		}
		break;
	case browserUserAgent.indexOf('iphone') >= 0:
		browserPlatform = 'iOS';
		platformVersion = browserUserAgent.split('iphone;');
		platformVersion = platformVersion[1].split('os ', 2);
		platformVersion = platformVersion[1].split(' ', 1);
		platformVersion = browserPlatform + ' ' + platformVersion[0];
		if (/_/g.test(platformVersion))
		{
			platformVersion = platformVersion.replace(/_/g, '.');
		}
		break;
	case browserUserAgent.indexOf('ipod') >= 0:
		browserPlatform = 'iOS';
		platformVersion = browserUserAgent.split('ipod;');
		platformVersion = platformVersion[1].split('os ', 2);
		platformVersion = platformVersion[1].split(' ', 1);
		platformVersion = browserPlatform + ' ' + platformVersion[0];
		if (/_/g.test(platformVersion))
		{
			platformVersion = platformVersion.replace(/_/g, '.');
		}
		break;
} // End iOSSwitch

switch (true) // WinOSSwitch - Check if platform is Windows
{
	case browserPlatform != 'Unknown Platform': // platform is mobile
		break;
	case browserUserAgent.indexOf('win 9x 4.90') >= 0: // agent string contains 'windows' and 'win', this needs to go first
 		browserPlatform = 'Windows';
		platformVersion = 'Windows ME';
		break;
	case browserUserAgent.indexOf('winnt') >= 0: // agent string does not contain 'windows' - rare
		browserPlatform = 'Windows';
		platformVersion = 'Windows NT';
		break;
	case browserUserAgent.indexOf('windows; u') >= 0: // browsers with strong security contain both Platform and OS, U = stong security
		browserPlatform = 'Windows';
		OSVersion = browserUserAgent.split('windows; u;');
		OSVersion = OSVersion[1].split('windows');
		OSVersion = OSVersion[1].split(';');
		OSVersion = OSVersion[0];
		break;
	case browserUserAgent.indexOf('windows') >= 0:
		browserPlatform = 'Windows';
		OSVersion = browserUserAgent.split('windows');
		if (OSVersion[1].indexOf(';') >= 0)
		{
			OSVersion = OSVersion[1].split(';');
			OSVersion = OSVersion[0];
		} else 
		{
			OSVersion = OSVersion[1].split(')');
			OSVersion = OSVersion[0];
		}
		break;
	case browserUserAgent.indexOf('98') >= 0: // agent string does not contain 'windows' - rare
		browserPlatform = 'Windows';
		platformVersion = 'Windows 98';
		break;
	case browserUserAgent.indexOf('95') >= 0: // agent string does not contain 'windows' - rare
		browserPlatform = 'Windows';
		platformVersion = 'Windows 95';
		break;
} // End WinOSSwitch

switch (true) // OtherOSSwitch - Check non-Windows Platform
{
	case browserPlatform != 'Unknown Platform': // platform is Windows or mobile
		break;
	case browserUserAgent.indexOf('macintosh') >= 0:
		browserPlatform = platformVersion = 'Macintosh';
		switch (true) // MacVersionSwitch - Check Mac OS version
		{
			case browserUserAgent.indexOf('mac os x 10_11') >= 0:
				platformVersion = 'Mac OSX 10.11';
				break;
			case browserUserAgent.indexOf('mac os x 10.11') >= 0:
				platformVersion = 'Mac OSX 10.11';
				break;
			case browserUserAgent.indexOf('mac os x 10_10') >= 0:
				platformVersion = 'Mac OSX 10.10';
				break;
			case browserUserAgent.indexOf('mac os x 10.10') >= 0:
				platformVersion = 'Mac OSX 10.10';
				break;
			case browserUserAgent.indexOf('mac os x 10_9') >= 0:
				platformVersion = 'Mac OSX 10.9';
				break;
			case browserUserAgent.indexOf('mac os x 10.9') >= 0:
				platformVersion = 'Mac OSX 10.9';
				break;
			case browserUserAgent.indexOf('mac os x 10_8') >= 0:
				platformVersion = 'Mac OSX 10.8';
				break;
			case browserUserAgent.indexOf('mac os x 10.8') >= 0:
				platformVersion = 'Mac OSX 10.8';
				break;
			case browserUserAgent.indexOf('mac os x 10_7') >= 0:
				platformVersion = 'Mac OSX 10.7';
				break;
			case browserUserAgent.indexOf('mac os x 10.7') >= 0:
				platformVersion = 'Mac OSX 10.7';
				break;	
			case browserUserAgent.indexOf('mac os x 10_6') >= 0:
				platformVersion = 'Mac OSX 10.6';
				break;
			case browserUserAgent.indexOf('mac os x 10.6') >= 0:
				platformVersion = 'Mac OSX 10.6';
				break;
			case browserUserAgent.indexOf('mac os x 10_5') >= 0:
				platformVersion = 'Mac OSX 10.5';
				break;
			case browserUserAgent.indexOf('mac os x 10.5') >= 0:
				platformVersion = 'Mac OSX 10.5';
				break;
			case browserUserAgent.indexOf('mac os x') >= 0:
				platformVersion = 'Mac OSX';
				break;
			case browserUserAgent.indexOf('powerPC') >= 0:
				platformVersion = 'Mac PowerPC';
				break;
		}
		break;
	case browserUserAgent.indexOf('cros') >= 0: // ChromeOS (Chromebook)
		browserPlatform = platformVersion = 'Chrome OS';
		break;		
	case browserUserAgent.indexOf('kindle') >= 0:// Amazon Kindle, check before linux - some kindle agents have linux in the string
		browserPlatform = platformVersion = 'Kindle';
		break;
	case browserUserAgent.indexOf('linux') >= 0:
		browserPlatform = platformVersion = 'Linux';
		break;
	case browserUserAgent.indexOf('sunos') >= 0:
		browserPlatform = platformVersion = 'Sun OS';
		break;
	case browserUserAgent.indexOf('x11') >= 0: // *NIX or UNIX-like platform
		browserPlatform = platformVersion = 'UNIX';
		break;
} // End OtherOSSwitch

switch (true) // WinVersionSwitch - Check Windows version
{
	case platformVersion != 'Unknown OS': // version was assigned in AndroidOSSwitch, iOSSwitch, WinOSSwitch or platform is non-Windows
		break;
	case OSVersion == ' nt 10.0' && OSBit == '64':
		platformVersion = 'Windows 10 64-bit';
		break;
	case OSVersion == ' nt 10.0':
		platformVersion = 'Windows 10';
		break;
	case OSVersion == ' nt 6.3' && OSBit == '64':
		platformVersion = 'Windows 8.1 64-bit';
		break;
	case OSVersion == ' nt 6.3':
		platformVersion = 'Windows 8.1';
		break;
	case OSVersion == ' nt 6.2' && OSBit == '64':
		platformVersion = 'Windows 8 64-bit';
		break;
	case OSVersion == ' nt 6.2':
		platformVersion = 'Windows 8';
		break;
	case OSVersion == ' nt 6.1' && OSBit == '64':
		platformVersion = 'Windows 7 64-bit';
		break;
	case OSVersion == ' nt 6.1':
		platformVersion = 'Windows 7';
		break;
	case OSVersion == ' nt 6.0' && OSBit == '64':
		platformVersion = 'Windows Vista 64-bit';
		break;
	case OSVersion == ' nt 6.0':
		platformVersion = 'Windows Vista';
		break;
	case OSVersion == ' nt 5.2':
		platformVersion = 'Windows .NET Server';
		break;
	case OSVersion == ' nt 5.1' && OSBit == '64':
		platformVersion = 'Windows XP 64-bit';
		break;
	case OSVersion == ' nt 5.1':
		platformVersion = 'Windows XP';
		break;
	case (OSVersion == ' nt 5.0') || (OSVersion == ' 2000'):
		platformVersion = 'Windows 2000';
		break;
	case (OSVersion == ' nt') || (OSVersion == ' nt 4.0'):
		platformVersion = 'Windows NT';
		break;
	case OSVersion == ' 98':
		platformVersion = 'Windows 98';
		break;
	case OSVersion == ' 95':
		platformVersion = 'Windows 95';
		break;
	case OSVersion == ' 3.1':
		platformVersion = 'Windows 3.1';
		break;
	case OSVersion == ' ce':
		platformVersion = 'Windows CE';
		break;
} // End WinVersionSwitch

switch (true) // BrowserSwitch - Checks browser and browser version
{
	case browserUserAgent.indexOf('edge') >= 0: // MS Edge
		browserAgent = 'Microsoft Edge';
		browserVersion = browserUserAgent.split('edge/');
		browserVersion = browserVersion[1].split('.');
		browserVersion = browserVersion[0];
		browserVersion = Number(browserVersion) + 8; // End user facing version is 20, when agent reports 12
		break;
	case browserUserAgent.indexOf('trident') >= 0: // trident layout engine (MSIE) found in IE8+
		browserAgent = 'Internet Explorer';
		tridentVersion = browserUserAgent.split('trident/');
		tridentVersion = tridentVersion[1].split(';');
		tridentVersion = tridentVersion[0];
		// id actual version and set compatibility view token
		switch (true)
		{
			case tridentVersion == 7.0: //IE11
				browserVersion = '11.0';
				if (browserUserAgent.indexOf('msie') >= 0) {compatMode = true;}
				break;
			case tridentVersion == 6.0: //IE10
				if (browserUserAgent.indexOf('msie') >= 0)
				{
					browserVersion = browserUserAgent.split('msie');
  					browserVersion = browserVersion[1].split(';');
  					browserVersion = browserVersion[0];
					if (browserVersion != 10.0) {compatMode = true;}
				}
				browserVersion = '10.0';
				break;
			case tridentVersion == 5.0: //IE9
				if (browserUserAgent.indexOf('msie') >= 0)
				{
					browserVersion = browserUserAgent.split('msie');
  					browserVersion = browserVersion[1].split(';');
  					browserVersion = browserVersion[0];
					if (browserVersion != 9.0) {compatMode = true;}
				}
				browserVersion = '9.0';
				break;
			case tridentVersion == 4.0: //IE8
				if (browserUserAgent.indexOf('msie') >= 0)
				{
					browserVersion = browserUserAgent.split('msie');
  					browserVersion = browserVersion[1].split(';');
  					browserVersion = browserVersion[0];
					if (browserVersion != 8.0) {compatMode = true;}
				}
				browserVersion = '8.0';
				break;
		}
		// if IE is running compatibility view, add to browser agent string
		if (compatMode == true) {browserAgent += ' <span class="warning">(Compatibility View)</span>';}
		break;
	case browserUserAgent.indexOf('msie') >= 0: // browser is Internet Explorer and not IE8+
		browserAgent = 'Internet Explorer';
  		browserVersion = browserUserAgent.split('msie');
  		browserVersion = browserVersion[1].split(';');
  		browserVersion = browserVersion[0];
		break;
	case browserUserAgent.indexOf('firefox') >= 0 && browserUserAgent.indexOf('navigator') < 0: // browser is Firefox

		browserAgent = 'Firefox';
  		browserVersion = browserUserAgent.split('firefox/');
		browserVersion = browserVersion[1].substring(0,4);
		break;
	case browserUserAgent.indexOf('chrome') >= 0: // browser is Chrome, this must be checked before Safari
		browserAgent = 'Chrome';
		browserVersion = browserUserAgent.split('chrome/');
		browserVersion = browserVersion[1].substring(0,4);
		break;
	case browserUserAgent.indexOf('crios') >= 0: //browser is Chrome on iOS, this must also be checked before Safari
		browserAgent = 'Chrome';
		browserVersion = browserUserAgent.split('crios/');
		browserVersion = browserVersion[1].substring(0,4);
		break;
	case browserUserAgent.indexOf('safari') >= 0: // browser is Safari
		browserAgent = 'Safari';
		switch (true) // SafariVersionSwitch - Checks Safari version
		{
			case browserUserAgent.indexOf('version') >= 0: // Checks if agent contains 'version'
				browserVersion = browserUserAgent.split('version/');
				browserVersion = browserVersion[1].split(' ');
				browserVersion = browserVersion[0];
				browserVersion = browserVersion.substring(0,3);
				break;
			default: 
				browserVersion = browserUserAgent.split('safari/');
				browserVersion = browserVersion[1].substring(0,3);
				switch (true) // SafariVersion2.0Switch - Checks Safari versions 2.04 and lower
				{
					case (browserVersion == '419') || (browserVersion == '417') || (browserVersion == '416') || (browserVersion == '412'):
						safariVersion = '2.0';
						break;
					case browserVersion == '312':
						safariVersion = '1.3';
						break;
					case browserVersion == '125':
						safariVersion = '1.2';
						break;
					case browserVersion == '100':
						safariVersion = '1.1';
						break;
					case browserVersion.substring(0,2) == '85':
						safariVersion = '1.0';
						break;
				}
				browserVersion = safariVersion;
				break;
		}
		break;
	case browserUserAgent.indexOf('navigator') >= 0:  // browser is Netscape 9.x
		browserAgent = 'Netscape';
		browserVersion = '9.0';
		break;
	case browserUserAgent.indexOf('netscape') >= 0:  // browser is Netscape 6.x - 8.x
		browserAgent = 'Netscape';
		browserVersion = browserUserAgent.split('netscape/');
		browserVersion = browserVersion[1].substring(0,3);
		break;	
} // End BrowserSwitch

function returnBrowserPlatform() // Function returns the platform/operating system
{
	return platformVersion; 
} // End returnBrowserPlatform()

function returnBrowserAgent() // Function returns the browser
{
  return browserAgent;  
} // End returnBrowserAgent

function returnBrowserVersion() // Function returns the browser version
{
  return browserVersion;  
} // End returnBrowserVersion

function checkBrowser() // Function checks for browser/OS compatibility with Bb
{
	switch (true) // BrowserCompatibilitySwitch
	{
		case browserAgent == ('Microsoft Edge'): // browser is Edge
			switch (true) // EdgeCompatibilitySwitch
			{
				case browserPlatform == 'Windows': // platform is Windows
					switch (true) // EdgeWindowsSwitch
					{
						case platformVersion == 'Windows 10 64-bit':
							switch (true) // EdgeVersionWin10-64Switch - what versions of Edge are OK for Windows 10-64
							{
								case parseFloat(browserVersion) > edgeMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) >= edgeMin:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) < edgeMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 10':
							switch (true) // EdgeVersionWin10-32Switch - what versions of Edge are OK for Windows 10-32
							{
								case parseFloat(browserVersion) > edgeMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) >= edgeMin:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) < edgeMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default:
							browserPass = 'fail';
							break;
					}
					break;
				default: // OS other than windows.  Edge is not supported.
					browserPass = 'fail';
					break;
			}
			break;
		// use indexOf instead of == becuase browserAgent may also contain "Compatibility View"
		case browserAgent.indexOf('Internet Explorer') >= 0: // browser is IE
			switch (true) // IECompatibilitySwitch
			{
				case browserPlatform == 'Windows': // platform is Windows
					switch (true) // IEWindowsSwitch
					{
						case platformVersion == 'Windows 10 64-bit':
							switch (true) // IEVersionWin10-64Switch - what versions of IE are OK for Windows 10-64
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) >= ieMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 10':
							switch (true) // IEVersionWin10-32Switch - what versions of IE are OK for Windows 10-32
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) >= ieMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8.1 64-bit':
							switch (true) // IEVersionWin8.1-64Switch - what versions of IE are OK for Windows 8.1-64
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) >= ieMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8.1':
							switch (true) // IEVersionWin8.1-32Switch - what versions of IE are OK for Windows 8.1-32
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) >= ieMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8 64-bit':
							switch (true) // IEVersionWin8-64Switch - what versions of IE are OK for Windows 8-64
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) > ieMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8':
							switch (true) // IEVersionWin8Switch - what versions of IE are OK for Windows 8
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) > ieMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 7 64-bit':
							switch (true) // IEVersionWin7-64Switch - what versions of IE are OK for Windows 7-64
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) >= ieMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 7':
							switch (true) // IEVersionWin7Switch - what versions of IE are OK for Windows 7
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) >= ieMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) >= ieMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows Vista 64-bit':
							switch (true) // IEVersionVista-64Switch - what versions of IE are OK for Vista-64
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == ieMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows Vista':
							switch (true) // IEVersionVistaSwitch - what versions of IE are OK for Vista
							{
								case parseFloat(browserVersion) > ieMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == ieMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default: // Other versions of Windows are not supported
							browserPass = 'fail';
							break;
					}
					break;
				default: // IE (of any version) does not pass for any OS other than Windows
					browserPass = 'fail';
					break;
			}
			if (compatMode == true) {browserPass = 'fail';}
			break;
		case browserAgent == 'Firefox':  // browser is Firefox
			switch (true) // FirefoxCompatibilitySwitch
			{
				case browserPlatform == 'Windows': // platform is Windows
					switch (true) // FirefoxWindowsSwitch
					{
						case platformVersion == 'Windows 10 64-bit':
							switch (true) // FirefoxVersionWin10-64Switch - what versions of Firefox are OK for Win10-64
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 10':
							switch (true) // FirefoxVersionWin10-32Switch - what versions of Firefox are OK for Win10-32
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8.1 64-bit':
							switch (true) // FirefoxVersionWin8.1-64Switch - what versions of Firefox are OK for Win8.1-64
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8.1':
							switch (true) // FirefoxVersionWin8.1-32Switch - what versions of Firefox are OK for Win8.1-32
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8 64-bit':
							switch (true) // FirefoxVersionWin8-64Switch - what versions of Firefox are OK for Win8-64
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8':
							switch (true) // FirefoxVersionWin8Switch - what versions of Firefox are OK for Win8
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 7 64-bit':
							switch (true) // FirefoxVersionWin7-64Switch - what versions of Firefox are OK for Win7-64
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 7':
							switch (true) // FirefoxVersionWin7Switch - what versions of Firefox are OK for Win7
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows Vista 64-bit':
							switch (true) // FirefoxVersionVista-64Switch - what versions of Firefox are OK for Vista-64
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows Vista':
							switch (true) // FirefoxVersionVistaSwitch - what versions of Firefox are OK for Vista
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default: // Other versions of Windows are not supported
							browserPass = 'fail';
							break;
					}
					break;
				case browserPlatform == 'Macintosh': // platform is Mac
					switch (true) // FirefoxMacSwitch
					{
						case platformVersion == 'Mac OSX 10.11':
							switch (true) // FirefoxVersionOSX10.11Switch - what versions of Firefox are OK for OSX 10.11
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.10':
							switch (true) // FirefoxVersionOSX10.10Switch - what versions of Firefox are OK for OSX 10.10
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.9':
							switch (true) // FirefoxVersionOSX10.9Switch - what versions of Firefox are OK for OSX 10.9
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.8':
							switch (true) // FirefoxVersionOSX10.8Switch - what versions of Firefox are OK for OSX 10.8
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.7':
							switch (true) // FirefoxVersionOSX10.7Switch - what versions of Firefox are OK for OSX 10.7
							{
								case parseFloat(browserVersion) > firefoxMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= firefoxMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default: // Other versions of Mac OS are not supported
							browserPass = 'fail';
							break;
					}
					break;
				default: // OS other than Mac or Windows are not supported
					browserPass = 'fail';
					break;
			}
			break;
		case browserAgent == 'Safari': // browser is Safari
			switch (true) // SafariCompatibilitySwitch
			{
				case browserPlatform == 'Macintosh':
				switch (true) // SafariMacSwitch
					{
						case platformVersion == 'Mac OSX 10.11':
							switch (true) // SafariVersionOSX10.11Switch - what versions of Safari are OK for OSX 10.11
							{
								case parseFloat(browserVersion) == safariMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) == safariMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.10':
							switch (true) // SafariVersionOSX10.10Switch - what versions of Safari are OK for OSX 10.10
							{
								case parseFloat(browserVersion) == safariMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) == safariMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.9':
							switch (true) // SafariVersionOSX10.9Switch - what versions of Safari are OK for OSX 10.9
							{
								case parseFloat(browserVersion) == safariMax:
									browserPass = 'pass';
									break;
								case parseFloat(browserVersion) > safariMin:
									browserPass = 'fail';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.8':
							switch (true) // SafariVersionOSX10.8Switch - what versions of Safari are OK for OSX 10.8
							{
								case parseFloat(browserVersion) >= safariMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == safariMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.7':
							switch (true) // SafariVersionOSX10.7Switch - what versions of Safari are OK for OSX 10.7
							{
								case parseFloat(browserVersion) >= safariMax:
									browserPass = 'fail';
									break;
								case parseFloat(browserVersion) == safariMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default: // Other versions of Mac OS are not supported
							browserPass = 'fail';
							break;
					}
					break;
				default: // OS other than Mac are not supported
					browserPass = 'fail';
					break;
			}
			break;
		case browserAgent == 'Chrome': // Browser is Chrome
		
			switch (true) // ChromeCompatibilitySwitch
			{
				case browserPlatform == 'Windows': // platform is Windows
					switch (true) // ChromeWindowsSwitch
					{
						case platformVersion == 'Windows 10 64-bit':
							switch (true) // ChromeVersionWin10-64Switch - what versions of Chrome are OK for Win10-64
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 10':
							switch (true) // ChromeVersionWin10-32Switch - what versions of Chrome are OK for Win10-32
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8.1 64-bit':
							switch (true) // ChromeVersionWin8.1-64Switch - what versions of Chrome are OK for Win8.1-64
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8.1':
							switch (true) // ChromeVersionWin8.1-32Switch - what versions of Chrome are OK for Win8.1-32
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8 64-bit':
							switch (true) // ChromeVersionWin8-64Switch - what versions of Chrome are OK for Win8-64
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 8':
							switch (true) // ChromeVersionWin8Switch - what versions of Chrome are OK for Win8
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 7 64-bit':
							switch (true) // ChromeVersionWin7-64Switch - what versions of Chrome are OK for Win7-64
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows 7':
							switch (true) // ChromeVersionWin7Switch - what versions of Chrome are OK for Win7
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows Vista 64-bit':
							switch (true) // ChromeVersionVista-64Switch - what versions of Chrome are OK for Vista-64
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Windows Vista':
							switch (true) // ChromeVersionVistaSwitch - what versions of Chrome are OK for Vista
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default: // Other versions of Windows are not supported

							browserPass = 'fail';
							break;
					}
					break;
				case browserPlatform == 'Macintosh': // platform is Mac
					switch (true) // ChromeMacSwitch
					{
						case platformVersion == 'Mac OSX 10.11':
							switch (true) // ChromeVersionOSX10.11Switch - what versions of Chrome are OK for OSX 10.11
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.10':
							switch (true) // ChromeVersionOSX10.10Switch - what versions of Chrome are OK for OSX 10.10
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.9':
							switch (true) // ChromeVersionOSX10.9Switch - what versions of Chrome are OK for OSX 10.9
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.8':
							switch (true) // ChromeVersionOSX10.8Switch - what versions of Chrome are OK for OSX 10.8
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'pass';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						case platformVersion == 'Mac OSX 10.7':
							switch (true) // ChromeVersionOSX10.7Switch - what versions of Chrome are OK for OSX 10.7
							{
								case parseFloat(browserVersion) > chromeMax:
									browserPass = 'warning';
									break;
								case parseFloat(browserVersion) >= chromeMin:
									browserPass = 'warning';
									break;
								default:
									browserPass = 'fail';
									break;
							}
							break;
						default: // Other versions of Mac OS are not supported
							browserPass = 'fail';
							break;
					}
					break;
				case browserPlatform == 'Chrome OS': // platform is ChromeOS
					switch (true) // ChromeChromeOsSwitch
					{
						case parseFloat(browserVersion) > chromeMax:
							browserPass = 'warning';
							break;
						case parseFloat(browserVersion) >= chromeMin:
							browserPass = 'pass';
							break;

						default:
							browserPass = 'fail';
							break;
					}
					break;
				default: // OS other than Mac, Windows or ChromeOS are not supported
					browserPass = 'fail';
					break;
			}
			break;
			
		case browserAgent == 'Netscape': // Browser is Netscape
			browserPass = 'fail';
			break;
	}
	switch (true)
	{
		case browserPass == 'pass': // if check passes load a pass image
			document['browserImg'].src='./images/pass.gif';
			document['browserImg'].alt='Pass';
			break;
		case browserPass == 'warning': // loads a warning image
			document['browserImg'].src='./images/warning.gif';
			document['browserImg'].alt='Warning';
			break;
		case browserPass == 'fail': // loads fail image, most of the checks have a preloaded fail image in the html file - assume fail 
			document['browserImg'].src='./images/fail.gif';
		   	document['browserImg'].alt='Fail';
			break;
	}
} // End checkBrowser()

function checkPopup() // Checks if pop-ups are allowed
{
	window.open('popup.html','popup','toolbar=no, width=250, height=250');
} // End checkPopup()

function checkCookies()
{
	var msg;
	msg = ' ';
	navigator.cookiesAreEnabled = checkCookiesAreEnabled();
	if (navigator.cookiesAreEnabled) 
	{
		document['cookiesImg'].src='./images/pass.gif';
		document['cookiesImg'].alt='Pass';
		msg = ' ';
	} 
	return msg; 
} // End checkCookies()

function checkCookiesAreEnabled() 
{
	setCookie('mo', 'mule');
	if (getCookie('mo')) 
	{
    	deleteCookie('mule');
    	return true;
  	} else
	{
    	return false;
	}
} // End checkCookiesAreEnabled()

function getCookie(name)
{
	var arg = name + '=';
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen)
	{
    	var j = i + alen;
    	if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
    	i = document.cookie.indexOf(' ', i) + 1;
    	if (i == 0) break;
	}
  	return null;
} // End getCookie()

function getCookieVal(offset) 
{
	var endstr = document.cookie.indexOf(';', offset);
	if (endstr == -1) endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
} // End getCookieval()

function deleteCookie(name, path, domain) 
{
	if (getCookie(name)) 
	{
    	document.cookie = name + '=' +
    	((path) ? '; path=' + path : '') +
    	((domain) ? '; domain=' + domain : '') +
    	'; expires=Thu, 01-Jan-70 00:00:01 GMT';
	}
} // End deleteCookie()

function setCookie(name, value, expires, path, domain, secure)
{
	document.cookie = name + '=' + escape (value) +
  	((expires) ? '; expires=' + expires.toGMTString() : '') +
	((path) ? '; path=' + path : '') +
	((domain) ? '; domain=' + domain : '') +
	((secure) ? '; secure' : '');
} // End setCookie()

function checkPorts() // Checks for allowed ports - could also be used for 443 and/or Collaboration Server ports
{
	if (document.images) 
  	{
		imgPort80URL = './images/pass.gif';
   		var imgPort80 = new Image();
		imgPort80.src = imgPort80URL;
    	if (imgPort80.width = '55') 
		{
       		document['port80Img'].src=imgPort80URL;
	   		document['port80Img'].alt='Pass';
    	}
  	}
} // End checkPorts()

function checkJava()
{
	// Check if Java is enabled in the browser
	if (navigator.javaEnabled())
	{
		jreEnabled = '<span style="color:#339900; font-weight:bold;">Enabled</span>';
	}
}

function checkJavaVersions()
{
	// What version(s) of Java are installed
	var javaArray = new Array();
	javaArray = deployJava.getJREs();
	if (javaArray.length > 0) {jreVersions = '';}
	for(var n=0; n<javaArray.length; n++)
	{
		jreVersions += javaArray[n] + '<br />';
	}
}

function returnJava()
{
	checkJava();
	return jreEnabled;
}

function returnJavaVersions()
{
	checkJavaVersions();
	return jreVersions;
}

function runChecks() // runs the check functions, except checkPlugins()
{
	checkBrowser();
	document['javaScriptImg'].src='./images/pass.gif'; // if Javascript is enabled this will be passed to the html file
	document['javaScriptImg'].alt='Pass'; // if Javascript is enabled this will be passed to the html file
	checkCookies();
	checkPopup();
	checkPorts();	
} // End runChecks()

window.onload=runChecks; // this calls the runChecks() function once the html is rendered