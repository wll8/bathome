/*版权声明：本库由 http://www.bathome.net 托管，CrLf 制作*/
/*使用时不得篡改版权声明*/

//Tools.js 的阉割版，为 web 引用而优化

//创建一个 MiniTools 对象，用于管理第三方命令行工具
//引用 Batch-CN 的集成资源，感谢 bailong360 提供帮助
//批处理原版 Batch-CN 见 http://www.bathome.net/viewthread.php?tid=32322
/*
	拥有以下 5 种方法，大多数方法执行成功时返回路径，失败时返回 undefined：
		test  测试能否正确在线获取库文件
		list  获取第三方命令行工具列表
		find  在可用列表中搜索指定工具，不区分大小写
		_cmpVersion  用 ver1 与 ver2 比较版本，高返回1，低返回-1，相等返回0
				指定的软件包名称不相符，返回 false
				指定了软件包名称，但未指定版本号，返回 true
		_text  返回获取的文本
*/

(function(){
	var host = './'
	var _text = ''

	var randomKey=Math.random()

	this.MiniTools = {
		test : test,
		list : list,
		find : find,
		_cmpVersion : cmpVersion,
		_text : function(){return _text}
	}

	function test(){
		//~测试是否已获得 list
		for(var i in list())return true
		return false
	}

	function list(Count){
		//~获取第三方命令行工具列表
		/*~
			{ return Object }

			例：
			var toolsList = MiniTools.list()
			for(var i in toolsList)alert(
				'工具名称:'+toolsList[i].name+'\r\n'+
				'本地路径:'+toolsList[i].localPath+'\r\n'+
				'bathome地址:'+toolsList[i].bathomePath+'\r\n'+
				'文件大小:'+toolsList[i].size+'\r\n'+
				'当前版本:'+toolsList[i].version+'\r\n'+
				'版本来源:'+toolsList[i].version_from+'\r\n'+
				'版本号:'+toolsList[i].version_id+'\r\n'+
				'帮助信息:'+toolsList[i].helpString+'\r\n'+
				'标签:'+toolsList[i].label+'\r\n'+
				'下载地址:'+toolsList[i].websiteUrl+'\r\n'+
				'优先下载:'+toolsList[i].priority
			)
			取得第三方工具列表
		~*/

		return getlist(Count)

	}

	function find(strName){
		//~在可用列表中搜索指定工具，不区分大小写
		/*~
			strName  要处理的命令名
			{ return Object || Undefined }

			例：
			MiniTools.find('sed')
			取得第三方工具列表中关于 sed 的信息
		~*/

		if(!strName)return

		var strName = strName.replace(/\.exe$/i,'').toLowerCase()

		var match = strName.match(/^(.*?)\/?([^\/]*)$/)

		var toolsList = list()
		for(var i in toolsList){
			if(/\//.test(i))continue
			var name = toolsList[i].name.toLowerCase()
			if(strName==i||strName==name)return toolsList[i]
		}

		for(var i in toolsList){
			if(!/\//.test(i))continue
			var name = toolsList[i].name.toLowerCase()
			if(!/\.rar$/i.test(strName))name = name.replace(/\.rar$/i,'')

			if(strName==i||strName==name)return toolsList[i]
			if(match[2]==name){
				var ret = cmpVersion(match[1],/,/.test(match[1]) ? toolsList[i].version : toolsList[i].version.replace(/[^,]*,/,''))
				if(ret===0)return toolsList[i]
			}
		}
	}

	function getlist(Count){
		var toolsList={}
		var maxCount = Count = Count===void 0? 15 : Count
		//默认重试 15 次

		var http = false;
		try {
			http = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
		}
		catch (e) {
			try {
				http = new ActiveXObject("MSXML2.ServerXMLHTTP");
			}
			catch (e1) {
				try {
					http = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e2) {
					try {
						http = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e3) {
						http = false;
					}
				}
			}
		}

		if (!http && typeof XMLHttpRequest != 'undefined') {
			//alert()
			http = new XMLHttpRequest();
		}

		ajaxGet(callback)

		getlist=function(){return toolsList}

		return toolsList

		function ajaxGet(callback){
			http.open("GET",host+'/tool.escape.txt'+'?'+randomKey,true)
			// try{http.setRequestHeader('Referer', 'http://libs.js.bathome.net/')}
			// catch(Err){}
			http.onreadystatechange = callback
			http.send()
		}

		function callback(){
			if(http.readyState == 4){
				if(http.status == 200){
					_text = unescape(http.responseText)
					var ar = _text.split(/\r?\n/)

					for(var i=0;i<ar.length;i++){
						var split = ar[i].split(/\s+/)
						if(split.length<5)continue
						if(/^rem$/.test(split[0]))continue

						var name = split[0].replace(/\.rar$/i,'').toLowerCase()
						var filename = /\.rar$/.test(split[0])?split[0]:split[0]+'.exe'
						var version = split[1].replace(/^(@|[优先]|[荐])/,'')

						var version_name = (version+'/'+name).toLowerCase()

						if(/,/.test(version)){
							var version_from = version.replace(/,.*?$/,'')
							var version_id = version.replace(/^.*,/,'')
						} else {
							var version_from = ''
							var version_id = version
						}

						toolsList[version_name]={
							name:split[0].replace(/\.rar$/i,''),
							localPath:filename,
							bathomePath:host+'./lib/'+filename,
							size:split[3].replace(/\s*Bytes$/,'')*1,
							version:version,
							version_from:version_from,
							version_id:version_id,
							helpString:split[2],
							label:split.slice(5).join(' '),
							websiteUrl:split[4]=='n.a.'?'':split[4],
							priority:/^(@|[优先]|[荐])/.test(split[1])
						}

						if(name in toolsList){
							var lastname = toolsList[name].version.toLowerCase()+'/'+name
							toolsList[lastname].bathomePath = host+'./lib/'+toolsList[name].version+'/'+toolsList[lastname].localPath
							toolsList[version_name].bathomePath = host+'./lib/'+version+'/'+filename

							var maxversion = maxVersion(toolsList[name].version,toolsList[version_name].version)
							maxversion = maxversion.toLowerCase()

							switch(true){
								case !toolsList[lastname].priority && toolsList[version_name].priority :
									toolsList[name] = toolsList[version_name]
									break
								case toolsList[lastname].priority && !toolsList[version_name].priority :
									toolsList[name] = toolsList[lastname]
									break
								case toolsList[lastname].priority && toolsList[version_name].priority :
									toolsList[lastname].priority = false
									toolsList[version_name].priority = false
									toolsList[maxversion+'/'+name].priority = true
									toolsList[name] = toolsList[maxversion+'/'+name]
									break
								default :
									toolsList[name] = toolsList[maxversion+'/'+name]
							}

							toolsList[name]._haveBrother = true
						} else {
							toolsList[name] = toolsList[version_name]
							toolsList[name]._haveBrother = false
						}
					}

					for(var i in toolsList){
						if(/\//.test(i))continue
						toolsList[toolsList[i].version.toLowerCase()+'/'+i].priority = toolsList[i].priority = toolsList[i]._haveBrother ? toolsList[i].priority : false
						delete toolsList[i]._haveBrother
					}
				} else if(Count-->0){
					setTimeout(function(){ajaxGet(callback)},(maxCount-Count)*1000)
				} else {
					toolsList = false
				}
			}
		}
	}

	function cmpVersion(ver1,ver2){
		var re_NA = /^(N\/A|unknow|NA|n.a.|null)$/i

		if(re_NA.test(ver1)&&!re_NA.test(ver2))return -1
		if(!re_NA.test(ver1)&&re_NA.test(ver2))return 1

		ver1 = ver1.toLowerCase()
		ver2 = ver2.toLowerCase()

		if(/,/.test(ver1)||/,/.test(ver2)){
			var v1=ver1.replace(/,*[^,]*$/,'')
			var v2=ver2.replace(/,*[^,]*$/,'')

			if(v1 !== v2)return false
			if(/[-\. \/,]$/.test(ver1)||/[-\. \/,]$/.test(ver2))return true

			var ver1=ver1.replace(/.*,/,'')
			var ver2=ver2.replace(/.*,/,'')
		}

		ver1=ver1
			.replace(/^[-\. \/]+/,'')
			.replace(/[-\. \/]+$/,'')
			.replace(/(\d)([^-\. \/0-9]+(?:[-\. \/]+|$))/g,'$1.$2')
			.replace(/(\d)(?:[-\. \/]+0+)+([-\. \/]+[^-\. \/0-9]*)?$/,'$1$2')

		ver2=ver2
			.replace(/^[-\. \/]+/,'')
			.replace(/[-\. \/]+$/,'')
			.replace(/(\d)([^-\. \/0-9]+(?:[-\. \/]+|$))/g,'$1.$2')
			.replace(/(\d)(?:[-\. \/]+0+)+([-\. \/]+[^-\. \/0-9]*)?$/,'$1$2')

		if(ver1==ver2)return 0

		var arr1=ver1.split(/[-\. \/]+/)
		var arr2=ver2.split(/[-\. \/]+/)

		for(var i=0;i<arr1.length&&i<arr2.length;i++){
			if(isNaN(arr1[i]) ^ isNaN(arr2[i]))return isNaN(n1) ? 1 : -1
			var n1=isNaN(arr1[i]) ? arr1[i] : arr1[i]*1
			var n2=isNaN(arr2[i]) ? arr2[i] : arr2[i]*1
			if(n1>n2)return 1
			if(n1<n2)return -1
		}
		if(arr1.length==arr2.length)return 0
		return arr1.length<arr2.length?-1:1
	}

	function maxVersion(ver1,ver2){
		return cmpVersion(ver1.replace(/.*,/,''),ver2.replace(/.*,/,''))>=0?ver1:ver2
	}
})()
