var te_PageValue = {
    Year: 2016,
    IsFirst: true,
    JipyoName: 'LEV5_TrafficVolume',
    JipyoCode: 'all',
    Kikan: 'weekdays',
    Time: '',
    dataInfo: '',
    LyrContainer: [],
    LyrContainer_simul: [],
    LyrLinkContainer: {},
    LyrZoneContainer: {},
    RoadType: {
        101: true,
        102: true,
        103: true,
        104: false,
        105: false,
        106: false,
        107: false,
        108: false
    },
    ZoneRoadType: {
        101: true,
        102: true,
        103: true,
        104: true,
        105: true,
        106: true,
        107: true,
        108: false
    },
    ZoneType: 0,
    RoadDispType: 1,
    ZoneDispType: 1,
    Road: {
        LabelChecked: false,
        NullInfoLink: {
            NullCheck: false,
            NullColor: '#808080'
        },
        MinMaxValue: [0, 0, 0, 0],
        Units: '',
        Scale: {
            DispMin: 1,
            DispMax: 1,
            MinWidth: 1,
            MaxWidth: 20,
            Color: '#47FF7E',
            Opacity: 10,
        },
        Classification: {
            Opacity: 10,
            WidthAll: '3.0',
            Grade: [{
                Select: true,
                Color: '#1A9641',
                Width: '3.0',
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#A6D96A',
                Width: '3.0',
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#FFFFBF',
                Width: '3.0',
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#FDAE61',
                Width: '3.0',
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#D7191C',
                Width: '3.0',
                Min: '',
                Max: ''
            }]
        }
    },
    Zone: {
        LabelChecked: false,
        NullInfoZone: {
            NullCheck: true,
            NullColor: '#808080'
        },
        MinMaxValue: [0, 0, 0, 0],
        Units: '',
        Classification: {
            Opacity: 50,
            Grade: [{
                Select: true,
                Color: '#1A9641',
                Width: 0.5,
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#A6D96A',
                Width: 0.5,
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#FFFFBF',
                Width: 0.5,
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#FDAE61',
                Width: 0.5,
                Min: '',
                Max: ''
            }, {
                Select: true,
                Color: '#D7191C',
                Width: 0.5,
                Min: '',
                Max: ''
            }]
        }
    },
    Simulation: {
    	Year: '2016',
    	SimulCheck: false,
    	PreJipyo: 'te',
    	TopGroupKey: null,	// 해당 기능 그룹키 
    	GroupKey: null,	// 시뮬레이션 그붋키
    	DelayTime: 0.5,
    	NowTime: 1,
    	Step: 5, // 5로 고정됨
    	Color: ['#1A9641', '#A6D96A', '#FFFFBF', '#FDAE61', '#D7191C'],
    	//Opacity: 0.8, // 분리
    	FnFreshslider: null,
    	Kind: 'Link',
    	PlayCheck: false,
    	SimulInterval: null,
    	//NullCheck: true, // 분리
    	//NullColor: '#808080', // 분리
    	SelectCriteria: [true, true, true, true, true],
    	SettingKind: 'Link',
    	CriteriaType: 'Variance',	// Fix or Variance : 범례 범위 고정 or 시간대별 유동범례범위
    	CriteriaType_zone: 'Variance',	// Fix or Variance : 범례 범위 고정 or 시간대별 유동범례범위
    	Link: {
    		Opacity: 0.9, // 생성
    		NullCheck: true, // 생성
        	NullColor: '#808080', // 생성
    		SrvLayerName: null,
    		LayerName: null,
    		LegendName: null,
    		Criteria: null,
    		UserCriteria: {
        		Min: [0, 30, 150, 500, 1500],
        		Max: [30, 150, 500, 1500, 3000],
        	},
        	RoadRank: null,
        	JipyoLayer: null,
        	SimulLayer: null,
        	FnStyle: null,
        	Width: [4, 4, 4, 4, 4, 4],
        	WidthAll: 4,
        	SelectCriteria: [true, true, true, true, true],
        	Color: ['#1A9641', '#A6D96A', '#FFFFBF', '#FDAE61', '#D7191C'],
    	},
    	Zone: {
    		Opacity: 0.7,
    		NullCheck: true,
        	NullColor: '#808080',
    		SrvLayerName: null,
    		LayerName: null,
    		LegendName: null,
    		Criteria: null,
    		UserCriteria: {
        		Min: [0, 30, 40, 50, 60],
        		Max: [30, 40, 50, 60, 150],
        	},
        	RoadRank: null,
        	JipyoLayer: null,
        	SimulLayer: null,
        	FnStyle: null,
        	ZoneType: null,
        	ZoneTimeValue: null,
        	FnName: 'trafficvolume',
        	SelectCriteria: [true, true, true, true, true],
        	Color: ['#1A9641', '#A6D96A', '#FFFFBF', '#FDAE61', '#D7191C']
    	}
    },
    TimeOut: null,
    legend_type : []
};
var dataChangeCheck_te = false;
var isLinkFirst_te = true;
var isZoneFirst_te = true;
var Trafficestimate = {
    fnTrafficestimateFirstLoad: function() {
    	Topmenu.sliderBar();
		var nYear = gTxMap.Year();
		var te_DisPlay = document.getElementById("trafficestimate").style.display;
		te_PageValue.Year = nYear;
		te_DisPlay = "";
		Topmenu.AccordionOpen('te_layersubwrap');
		SlidingPanelShow('trafficestimate');
		
		dataChangeCheck_te = true; // 첫 동작시 DB 타기 위해 수동으로 true 설정
		Trafficestimate.fnReDraw();
    },
    fnClickLink : function() {
        var height = $('#trafficestimate').height();
        $('#te_functionsubpanelcover').css('height', height);
        $('#te_functionsubpanelcover').css('margin-top', -Math.abs(height + 20));
        var val = $("#teStepRoad").val();
        if (val > 7) {
            $("#te_classcontentTbody").width("109%")
        } else {
            $("#te_classcontentTbody").width("101%")
        }
        var content = "";
        for (var i = 1; i <= val; i++) {
            content += '<tr>';
            content += '<td style="width: 50px; padding-left: 11px;">';
            content += '<div class="checkboxsett">';
            content += '<input type="checkbox" value="1" id="te_checkboxtable' + i + 'a" name="ckBoxTablea" checked = "checked" class="te_chks"/>';
            content += '<label for="te_checkboxtable' + i + 'a"></label>';
            content += '</div>';
            content += '</td>';
            content += '<td style="width: 34px; padding-left: 11px; padding-top: 13px;">';
            content += '<div class="tablecolorbox">';
            content += '<div style="top:-9px; left:-13px; position:absolute">';
            content += '<input id="te_colorpickert' + i + 'a" class="te_colorpickerts" />';
            content += '<input id="te_colorpickert' + i + 'aCopy"  type="text" style="display: none" />';
            content += '</div>';
            content += '</div>';
            content += '</td>';
            content += '<td style="padding-left: 20px;">';
            content += '<select name="te_ClassGradeWidth" class="select-style3" id="te_ClassGradeWidth' + i + '"  data-settings=' + '{"cutOff": 6}' + '>';
            content += '<option value="10.0">10.0</option>';
            content += '<option value="9.0">9.0</option>';
            content += '<option value="8.0">8.0</option>';
            content += '<option value="7.0">7.0</option>';
            content += '<option value="6.0">6.0</option>';
            content += '<option value="5.0" selected="selected">5.0</option>';
            content += '<option value="4.0">4.0</option>';
            content += '<option value="3.0">3.0</option>';
            content += '<option value="2.0">2.0</option>';
            content += '<option value="1.0">1.0</option>';
            content += '</select>';
            content += '</td>';
            content += '<td class="valbox" style="padding:8px 0px 8px 11px;">';
            content += '<input type="text" name="te_MinLink_1" id = "te_IxRangeMinLink' + i + '" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
            content += '</td>';
            content += '<td class="valbox" style="padding:8px 0px 8px 17px;">';
            content += '<input type="text" name="te_MaxLink_2" id = "te_IxRangeMaxLink' + i + '" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
            content += '</td>';
            content += '</tr>'
        }
        $("#te_classcontent table tbody").html(content);
        
        var nRoadDispType = te_PageValue.RoadDispType;
        if (nRoadDispType == 0) {
            $("#te_checkboxscale").prop('checked', true);
            var scalewidthcontentDip = $('#te_scalewidthcontent').css('display');
            if (scalewidthcontentDip == 'none') {
                $("#te_scalewidthcontent").toggleClass('on');
                $("#te_classcontent").toggleClass('on');
                $('#te_ClassificationFrame').css('display', 'none')
            }
        } else {
            $("#te_checkboxclass").prop('checked', true);
            var te_classcontentDip = $('#te_classcontent').css('display');
            if (te_classcontentDip == 'none') {
                $("#te_scalewidthcontent").toggleClass('on');
                $("#te_classcontent").toggleClass('on');
                $('#te_ClassificationFrame').css('display', 'block')
            }
        }
        var dJiPoyResultMin = parseInt(Number(te_PageValue.Road.MinMaxValue[0]));
        var dJiPoyResultMax = 0;
        if (Number(te_PageValue.Road.MinMaxValue[1]) == 0) {
            dJiPoyResultMax = parseInt(Number(te_PageValue.Road.MinMaxValue[1]))
        } else {
            dJiPoyResultMax = parseInt(Number(te_PageValue.Road.MinMaxValue[1]) + 0.5)
        }
        var dJiPoyRoadtMin = parseInt(Number(te_PageValue.Road.MinMaxValue[2]));
        var dJiPoyRoadMax = 0;
        if (Number(te_PageValue.Road.MinMaxValue[3]) == 0) {
            dJiPoyRoadMax = parseInt(Number(te_PageValue.Road.MinMaxValue[3]))
        } else {
            dJiPoyRoadMax = parseInt(Number(te_PageValue.Road.MinMaxValue[3]) + 0.5)
        }
        document.getElementById('te_IxMinValueLink').value = Number(dJiPoyResultMin).toLocaleString('en').split(".")[0];
        document.getElementById('te_IxMaxValueLink').value = Number(dJiPoyResultMax).toLocaleString('en').split(".")[0] + '  (' + te_PageValue.Road.Units + ')';
        document.getElementById('te_IxRoadSelectMinValueLink').value = Number(dJiPoyRoadtMin).toLocaleString('en').split(".")[0];
        document.getElementById('te_IxRoadSelectMaxValueLink').value = Number(dJiPoyRoadMax).toLocaleString('en').split(".")[0] + '  (' + te_PageValue.Road.Units + ')';
        document.getElementById('te_PyoChoolMin').value = Number(parseInt(Number(te_PageValue.Road.Scale.DispMin))).toLocaleString('en').split(".")[0];
        if (Number(te_PageValue.Road.Scale.DispMax) == 0) {
            document.getElementById('te_PyoChoolMax').value = Number(parseInt(Number(te_PageValue.Road.Scale.DispMax))).toLocaleString('en').split(".")[0]
        } else {
            document.getElementById('te_PyoChoolMax').value = Number(parseInt(Number(te_PageValue.Road.Scale.DispMax) + 0.5)).toLocaleString('en').split(".")[0]
        }
        $("#te_ScaleOpacity").val(te_PageValue.Road.Scale.Opacity).prop("selected", true);
        $("#te_ClassOpacityLink").val(te_PageValue.Road.Classification.Opacity).prop("selected", true);
        document.getElementById('te_ScaleWidthColorCopy').value = te_PageValue.Road.Scale.Color;
        document.getElementById('te_RoadNullColorCopy').value = te_PageValue.Road.NullInfoLink.NullColor;
        $("#te_colorpickerr1").spectrum({
            color: te_PageValue.Road.Scale.Color,
            showInput: true,
            preferredFormat: "hex",
            change: function(color) {
                document.getElementById('te_ScaleWidthColorCopy').value = color.toHexString()
            }
        });
        $("#te_RoadNullColor").spectrum({
            color: te_PageValue.Road.NullInfoLink.NullColor,
            showInput: true,
            preferredFormat: "hex",
            change: function(color) {
                document.getElementById('te_RoadNullColorCopy').value = color.toHexString()
                if($('#te_RoadNullCheck').is(":checked") == true) {
                	Trafficestimate.timeRoadChangeEvent();                	
                }
            }
        });
        $("#te_RoadNullCheck").prop('checked', te_PageValue.Road.NullInfoLink.NullCheck);
        $("#te_Roadlabel").prop('checked', te_PageValue.Road.LabelChecked);
        var ClassificationGradeCheckLink = te_PageValue.Road.Classification.Grade;
        var WidthAll = te_PageValue.Road.Classification.WidthAll;
        for (var j = 0; j < val; j++) {
            $("#te_checkboxtable" + (j + 1) + "a").prop('checked', ClassificationGradeCheckLink[j].Select);
            $("#te_colorpickert" + (j + 1) + "a").spectrum({
                color: ClassificationGradeCheckLink[j].Color,
                showInput: true,
                preferredFormat: "hex",
            });
            $("#te_ClassGradeWidth" + (j + 1)).val(ClassificationGradeCheckLink[j].Width).prop("selected", true);
            document.getElementById('te_IxRangeMinLink' + (j + 1)).value = Number(ClassificationGradeCheckLink[j].Min).toLocaleString('en').split(".")[0];
            document.getElementById('te_IxRangeMaxLink' + (j + 1)).value = Number(ClassificationGradeCheckLink[j].Max).toLocaleString('en').split(".")[0]
        }
        $("#te_WidthThicknessrangeroute01").freshslider({
            range: true,
            step: 1,
            min: 1,
            max: 25,
            value: [te_PageValue.Road.Scale.MinWidth, te_PageValue.Road.Scale.MaxWidth],
            onchange: function(low, high) {
                document.getElementById('te_WidthMinCopy').value = low;
                document.getElementById('te_WidthMaxCopy').value = high
            }
        })
        $('#te_ClassGradeWidth_All').val(WidthAll);
    },
    fnClickZone : function(){
		var height = $('#Trafficestimate').height();
        var val = $("#teStepArea").val();
        if (val > 7) {
            $("#te_classcontentZoneTbody").width("109%")
        } else {
            $("#te_classcontentZoneTbody").width("101%")
        }
        var content = "";
        for (var i = 1; i <= val; i++) {
            content += '<tr>';
            content += '<td style="width: 46px; padding-left: 6px;">';
            content += '<div class="checkboxsett" Style="margin-left: 11px">';
            content += '<input type="checkbox" value="1" id="te_checkboxtable' + i + 'b" name="ckBoxTableb_te"/>';
            content += '<label for="te_checkboxtable' + i + 'b"></label>';
            content += '</div>';
            content += '</td>';
            content += '<td style="width: 46px; padding-left: 22px; padding-top: 13px;">';
            content += '<div class="tablecolorbox" Style="margin-left: 11px">';
            content += '<div style="top:-9px; left:-13px; position:absolute">';
            content += '<input id="te_colorpickert' + i + 'b" class="te_colorpickerts2" />';
            content += '<input id="te_colorpickert' + i + 'bCopy"  type="text" style="display: none" />';
            content += '</div>';
            content += '</div>';
            content += '</td>';
            content += '<td class="valbox" style="width: 70px; padding:8px 0px 8px 36px">';
            content += '<input type="text" name="te_MinLink_1" id = "te_IxRangeMinZone' + i + '" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
            content += '</td>';
            content += '<td class="valbox" style="width: 46px; padding:8px 0px 8px 31px">';
            content += '<input type="text" name="te_MaxLink_2" id = "te_IxRangeMaxZone' + i + '" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
            content += '</td>';
            content += '</tr>'
        }
        $("#te_classcontentZone table tbody").html(content);
        var dJiPoyZoneMin = parseInt(Number(te_PageValue.Zone.MinMaxValue[0]));
        var dJiPoyZoneMax = parseInt(Number(te_PageValue.Zone.MinMaxValue[1]));
        var dJiPoyZoneByRoadMin = parseInt(Number(te_PageValue.Zone.MinMaxValue[2]));
        var dJiPoyZoneByRoadMax = parseInt(Number(te_PageValue.Zone.MinMaxValue[3]));
        document.getElementById('te_IxMinValueZone').value = Number(dJiPoyZoneMin).toLocaleString('en').split(".")[0];
        document.getElementById('te_IxMaxValueZone').value = Number(dJiPoyZoneMax).toLocaleString('en').split(".")[0] + '  (' + te_PageValue.Zone.Units + ')';
        document.getElementById('te_IxRoadSelectMinValueZone').value = Number(dJiPoyZoneByRoadMin).toLocaleString('en').split(".")[0];
        document.getElementById('te_IxRoadSelectMaxValueZone').value = Number(dJiPoyZoneByRoadMax).toLocaleString('en').split(".")[0] + '  (' + te_PageValue.Zone.Units + ')';
        $("#te_ClassOpacityZone").val(te_PageValue.Zone.Classification.Opacity).prop("selected", true);
        var ClassificationGradeCheckZone = te_PageValue.Zone.Classification.Grade;
        for (var i = 0; i < val; i++) {
            $("#te_checkboxtable" + (i + 1) + "b").prop('checked', ClassificationGradeCheckZone[i].Select);
            $("#te_colorpickert" + (i + 1) + "b").spectrum({
                color: ClassificationGradeCheckZone[i].Color,
                showInput: true,
                preferredFormat: "hex",
            });
            document.getElementById('te_IxRangeMinZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Min).toLocaleString('en').split(".")[0];
            document.getElementById('te_IxRangeMaxZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Max).toLocaleString('en').split(".")[0]
        }
        $("#te_ZoneNullColor").spectrum({
            color: te_PageValue.Zone.NullInfoZone.NullColor,
            showInput: true,
            preferredFormat: "hex",
            change: function(color) {
                document.getElementById('te_ZoneNullColorCopy').value = color.toHexString()
                if($('#te_ZoneNullCheck').is(":checked") == true) {
                	Trafficestimate.timeZoneChangeEvent();                	
                }
            }
        });
        $("#te_ZoneNullCheck").prop('checked', te_PageValue.Zone.NullInfoZone.NullCheck);
        $("#te_ZoneNullColorCopy").val(te_PageValue.Zone.NullInfoZone.NullColor);
        $("#te_Zonelabel").prop('checked', te_PageValue.Zone.LabelChecked)
        
	},
    fnReDraw : function() {
    	let simulPageValue = TxJipyoSimulation.getPageValue('te');
    	let isTypeSimul = simulPageValue.SimulCheck;
		let findResult_time = gTxMap.FindIdxTxGroupLayer(Constants.TxGroupKey.TxAA01);
		let findResult_simul = gTxMap.FindIdxTxGroupLayer(Constants.TxGroupKey.TxAA01S);
        // john: 맨 위에 전역 변수로 dataChangeCheck 선언. 값이 true면 백단 가기, false면 지도만 지웠다가 다시 그리기
		if(dataChangeCheck_te == false) {
			switch(isTypeSimul){
				case false : 
					if(findResult_time.length != 0) {
						gTxMap.RemoveTxGroupLayer(Constants.TxGroupKey.TxAA01);
						setTimeout(function(){
							gTxMap.SetTx0000Layer(Constants.TxGroupKey.TxAA01, te_PageValue.LyrContainer);
						},100)						
					} else { dataChangeCheck_te = true; Trafficestimate.fnReDraw(); } break;
				case true :
					if(findResult_simul.length != 0) {
						gTxMap.RemoveTxGroupLayer(Constants.TxGroupKey.TxAA01S);
						setTimeout(function(){
							gTxMap.SetTx0000Layer(Constants.TxGroupKey.TxAA01S, te_PageValue.LyrContainer_simul);
						},100)						
					} else { dataChangeCheck_te = true; Trafficestimate.fnReDraw(); } break;
			}
		} else {
			$("#te_checkboxlayer5").prop('checked', "checked");
			$('#LodingPanel').css("display", "block");
			te_PageValue.Kikan = $("input[name='te_rb']:checked").val();
			te_PageValue.Time = $('#te_timezone').val();
			fnChangeChecked(te_PageValue, 'te');
		    
			fnSpeedCommon.displayBySimulCheck('te');
			fnSpeedCommon.fnZoneMsg('te');
			fnSpeedCommon.fnRoadMsg('te');
	        
			var f_ProAjax = TxAjax.JiPyoPromiseReady();
			f_ProAjax = f_ProAjax.then(te_UtilJipyo.JipyoMinMaxLink);
			f_ProAjax = f_ProAjax.then(te_UtilJipyo.JipyoSelectMinMax); // ******
			f_ProAjax = f_ProAjax.then(te_UtilJipyo.teGradeLink);	        
			
			if (te_PageValue.ZoneType != 0) {
	        	/*f_ProAjax = f_ProAjax.then(te_UtilJipyo.JipyoSelectZoneMinMax); // ******
	        	f_ProAjax = f_ProAjax.then(te_UtilJipyo.jiPyoZoneBySelectRoadMinMax);
	        	f_ProAjax = f_ProAjax.then(te_UtilJipyo.JipyoGradeZone);*/
		        
	        	f_ProAjax = f_ProAjax.then(te_UtilJipyo.teZoneCalculation); 
	        	f_ProAjax = f_ProAjax.then(te_UtilJipyo.teGradeZone);
	        }
			
	        f_ProAjax.then(te_oJipyoMapDraw.TxJipyoMapDraw)
	        dataChangeCheck_te = false; // 초기화
	        
	        te_PageValue.legend_type.length = 0;
			if($("input:checkbox[name=te_road_revel]:checked").length == 0 &&
			   $("input:checkbox[name=te_rb1]:checked").length != 0) {
				te_PageValue.legend_type.push('zone');
			} else if($("input:checkbox[name=te_road_revel]:checked").length != 0 &&
			   $("input:checkbox[name=te_rb1]:checked").length == 0) {
				te_PageValue.legend_type.push('link');
			}
			fn_confirmBtnStatus('disabled', 'te');
		}
    },
    fnSimulationStyle_Link: function(feature){
		if(String(te_PageValue.Simulation.NowTime).length == 1){
			te_PageValue.Simulation.NowTime = "0"+te_PageValue.Simulation.NowTime;
		}

		var tTime = 't'+te_PageValue.Simulation.NowTime;
		var criteria = te_PageValue.Simulation.Link.Criteria[tTime];
		var criteriaMin = te_PageValue.Simulation.Link.UserCriteria.Min;
		var criteriaMax = te_PageValue.Simulation.Link.UserCriteria.Max;
		var selectRoadRank = te_PageValue.Simulation.Link.RoadRank;
		var arrWidth = te_PageValue.Simulation.Link.Width;
		var arrColor = te_PageValue.Simulation.Link.Color;
		var step = te_PageValue.Simulation.Step;
		var data = feature.getProperties();
		var link_id = data['link_id'];
		var strRoad_rank = data['road_rank'];
		var value = null;
		var color = null;
		var width = null;
		var nullCheck = te_PageValue.Simulation.NullCheck;
		var nullColor = te_PageValue.Simulation.NullColor;
		var selectCriteria = te_PageValue.Simulation.Link.SelectCriteria;
		var criteriaType = te_PageValue.Simulation.CriteriaType;
		
		if(selectRoadRank.indexOf(strRoad_rank) == -1){
			return null;
		} 

		value = Number(data[tTime]);
		
		if(nullCheck){
			color = nullColor;
		} else {
			color = 'transparent';
		}
		
		if(criteriaType == 'Fix'){
			for(var i = 0; i<step; i++){
				if(Number(criteriaMin[i]) <  value && value <= Number(criteriaMax[i])){
					color = arrColor[i];
					width = arrWidth[i];
					
					if(!selectCriteria[i]){
						color = 'transparent';
					}
					break;
				}
			}
		} else if(criteriaType == 'Variance') {
			for(var i = 0; i<step; i++){
				if(Number(criteria[i]) <  value && value <= Number(criteria[i+1])){
					color = arrColor[i];
					width = arrWidth[i];
					break;
				}
			}
		}

		var style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: color,
				width: width,
				lineCap: 'round',
			})
		});

		return style;
	},
	fnSimulationStyle_Zone: function(feature){
		if(typeof(te_PageValue.Simulation.NowTime) == 'string'){
			te_PageValue.Simulation.NowTime = Number(te_PageValue.Simulation.NowTime)
		}
		
		var timeIndex = te_PageValue.Simulation.NowTime - 1;
		var criteria = te_PageValue.Simulation.Zone.Criteria['t01'];	// t01 하나만 존재, 시간대별 동일 범례 0, 30, 40, 50, 60, 150
		var criteriaMin = te_PageValue.Simulation.Zone.UserCriteria.Min;
		var criteriaMax = te_PageValue.Simulation.Zone.UserCriteria.Max;
		var arrColor = te_PageValue.Simulation.Zone.Color;
		var step = te_PageValue.Simulation.Step;
		
		
		var data = te_PageValue.Simulation.Zone.ZoneTimeValue;
		
		
		var properties =  feature.getProperties();
		var zone_id = properties['zone_id'];
		var zoneData = data[zone_id];
		var value = null;
		var color = null;
		var nullCheck = te_PageValue.Simulation.Zone.NullCheck;
		var nullColor = te_PageValue.Simulation.Zone.NullColor;
		var selectCriteria = te_PageValue.Simulation.Zone.SelectCriteria;
		var criteriaType = te_PageValue.Simulation.CriteriaType_zone;
		
		if(nullCheck){
			color = nullColor;
		} else {
			color = 'transparent';
		}
		
		//zoneData 가 없는 경우 에러 처리
		try {
			value = Number(zoneData[timeIndex]);
		} catch(e) {}
		
		if(criteriaType == 'Fix'){
			for(var i = 0; i<step; i++){
				if(Number(criteriaMin[i]) <  value && value <= Number(criteriaMax[i])){
					color = arrColor[i];
					
					if(!selectCriteria[i]){
						color = 'transparent';
					}
					break;
				}
			}
		} else if(criteriaType == 'Variance') {
			for(var i = 0; i<step; i++){
				if(Number(criteria[i]) <  value && value <= Number(criteria[i+1])){
					color = arrColor[i];
					break;
				}
			}
		}
		var style = new ol.style.Style({
			fill: new ol.style.Fill({
				color: color,
			}),
			stroke: new ol.style.Stroke({
				color: '#ffffff',
				width: 2,
			})
		});
		return style;
	},
	timeRoadChangeEvent : function() {
        te_PageValue.Road.Scale.MinWidth = document.getElementById('te_WidthMinCopy').value;
        te_PageValue.Road.Scale.MaxWidth = document.getElementById('te_WidthMaxCopy').value;
        document.getElementById('te_PyoChoolMinCopy').value = (document.getElementById('te_PyoChoolMin').value).replace(/\,/g, '').split(".")[0];
        document.getElementById('te_PyoChoolMaxCopy').value = (document.getElementById('te_PyoChoolMax').value).replace(/\,/g, '').split(".")[0];
        te_PageValue.Road.Scale.DispMin = document.getElementById('te_PyoChoolMinCopy').value;
        te_PageValue.Road.Scale.DispMax = Number(document.getElementById('te_PyoChoolMaxCopy').value);
        document.getElementById('te_PyoChoolMin').value = Number(te_PageValue.Road.Scale.DispMin).toLocaleString('en').split(".")[0];
        document.getElementById('te_PyoChoolMax').value = Number(te_PageValue.Road.Scale.DispMax).toLocaleString('en').split(".")[0];
        te_PageValue.Road.Scale.Color = document.getElementById('te_ScaleWidthColorCopy').value;
        te_PageValue.Road.Scale.Opacity = document.getElementById('te_ScaleOpacity').value;
        te_PageValue.Road.LabelChecked = $('#te_Roadlabel').is(":checked");
        te_PageValue.Road.NullInfoLink.NullCheck = $('#te_RoadNullCheck').is(":checked");
        te_PageValue.Road.NullInfoLink.NullColor = document.getElementById('te_RoadNullColorCopy').value;
        te_PageValue.Road.Classification.Opacity = document.getElementById('te_ClassOpacityLink').value;
        te_PageValue.Road.Classification.WidthAll = document.getElementById('te_ClassGradeWidth_All').value;
        var ClassificationGradeCheckLink = te_PageValue.Road.Classification.Grade;
        var val = $("#teStepRoad").val();
        for (var i = 0; i < val; i++) {
            ClassificationGradeCheckLink[i].Select = $("#te_checkboxtable" + (i + 1) + "a").is(":checked");
            ClassificationGradeCheckLink[i].Color = $("#te_colorpickert" + (i + 1) + "a").spectrum('get').toHexString();
            ClassificationGradeCheckLink[i].Width = document.getElementById('te_ClassGradeWidth' + (i + 1)).value;
            ClassificationGradeCheckLink[i].Min = (document.getElementById("te_IxRangeMinLink" + (i + 1)).value).replace(/\,/g, '');
            ClassificationGradeCheckLink[i].Max = (document.getElementById("te_IxRangeMaxLink" + (i + 1)).value).replace(/\,/g, '');
            document.getElementById('te_IxRangeMinLink' + (i + 1)).value = Number(ClassificationGradeCheckLink[i].Min).toLocaleString('en').split(".")[0];
            document.getElementById('te_IxRangeMaxLink' + (i + 1)).value = Number(ClassificationGradeCheckLink[i].Max).toLocaleString('en').split(".")[0]
        }
        
        var strSld = null;
     	var strCheckboxscale = $('input[name="te_rbs"]:checked').val();
        if (strCheckboxscale == 'Scale Width') {
        	te_PageValue.RoadDispType = 0;
        	strSld = TxSldTraEstScaleLink2(te_PageValue.LyrLinkContainer.layerName, te_PageValue);
        } else {
        	te_PageValue.RoadDispType = 1;
        	strSld = TxSldTraEstClassLink2(te_PageValue.LyrLinkContainer.layerName, te_PageValue);
        }
		let layerName = te_PageValue.LyrLinkContainer.layerName;
		let roadRank = te_PageValue.LyrLinkContainer.roadRank;
		let viewParams = te_PageValue.LyrLinkContainer.viewParams;

		let params = {
			cqlParams: roadRank,
			viewParams: viewParams
		};
		oLayer = gTxMap.TxRoadLayerCreate(Constants.TxGroupKey.TxAA01, 0,  layerName,params, strSld);
		gTxMap.RemoveLayer("TxCongLink_"+Constants.TxGroupKey.TxAA01);
		gTxMap.AddLayer(oLayer);
		
		dataChangeCheck_te = true;
	},
	timeZoneChangeEvent : function() {
		$.each($('input[name=te_zone_road_revel]'), function(idx, val) {
            var roadType = $(this).val();
            if ($(this).is(':checked')) {
                te_PageValue.ZoneRoadType[roadType] = true
            } else {
                te_PageValue.ZoneRoadType[roadType] = false
            }
        });
		te_PageValue.Zone.Classification.Opacity = document.getElementById('te_ClassOpacityZone').value;
        var ClassificationGradeCheckZone = te_PageValue.Zone.Classification.Grade;
        var val = $("#teStepArea").val();
        for (var i = 0; i < val; i++) {
            ClassificationGradeCheckZone[i].Select = $("#te_checkboxtable" + (i + 1) + "b").is(":checked");
            ClassificationGradeCheckZone[i].Color = $("#te_colorpickert" + (i + 1) + "b").spectrum('get').toHexString();
            ClassificationGradeCheckZone[i].Min = (document.getElementById("te_IxRangeMinZone" + (i + 1)).value).replace(/\,/g, '');
            ClassificationGradeCheckZone[i].Max = (document.getElementById("te_IxRangeMaxZone" + (i + 1)).value).replace(/\,/g, '');
            document.getElementById('te_IxRangeMinZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Min).toLocaleString('en').split(".")[0];
            document.getElementById('te_IxRangeMaxZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Max).toLocaleString('en').split(".")[0]
        }
        te_PageValue.Zone.LabelChecked = $('#te_Zonelabel').is(":checked");
        te_PageValue.Zone.NullInfoZone.NullCheck = $('#te_ZoneNullCheck').is(":checked");
        te_PageValue.Zone.NullInfoZone.NullColor = document.getElementById('te_ZoneNullColorCopy').value;
        if ($('#te_ZoneNullColorCopy').val() == '') {
            te_PageValue.Zone.NullInfoZone.NullColor = '#808080'
        }
		
        if(gTxMap.GetLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01+"_label") != null) {
    		gTxMap.RemoveLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01+"_label");
    	}
        oLayer = gTxMap.TxZoneLayerCreate(Constants.TxGroupKey.TxAA01, 1, te_PageValue.LyrZoneContainer.layerName, te_PageValue.LyrZoneContainer.data, te_PageValue);
        gTxMap.RemoveLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01);
		gTxMap.AddLayer(oLayer);
		
		dataChangeCheck_te = true;
	},
	timeZoneChangeEvent_label : function() {
		$.each($('input[name=te_zone_road_revel]'), function(idx, val) {
			var roadType = $(this).val();
			if ($(this).is(':checked')) {
				te_PageValue.ZoneRoadType[roadType] = true
			} else {
				te_PageValue.ZoneRoadType[roadType] = false
			}
		});
		te_PageValue.Zone.Classification.Opacity = document.getElementById('te_ClassOpacityZone').value;
		var ClassificationGradeCheckZone = te_PageValue.Zone.Classification.Grade;
		var val = $("#teStepArea").val();
		for (var i = 0; i < val; i++) {
			ClassificationGradeCheckZone[i].Select = $("#te_checkboxtable" + (i + 1) + "b").is(":checked");
			ClassificationGradeCheckZone[i].Color = $("#te_colorpickert" + (i + 1) + "b").spectrum('get').toHexString();
			ClassificationGradeCheckZone[i].Min = (document.getElementById("te_IxRangeMinZone" + (i + 1)).value).replace(/\,/g, '');
			ClassificationGradeCheckZone[i].Max = (document.getElementById("te_IxRangeMaxZone" + (i + 1)).value).replace(/\,/g, '');
			document.getElementById('te_IxRangeMinZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Min).toLocaleString('en').split(".")[0];
			document.getElementById('te_IxRangeMaxZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Max).toLocaleString('en').split(".")[0]
		}
		te_PageValue.Zone.LabelChecked = $('#te_Zonelabel').is(":checked");
		te_PageValue.Zone.NullInfoZone.NullCheck = $('#te_ZoneNullCheck').is(":checked");
		te_PageValue.Zone.NullInfoZone.NullColor = document.getElementById('te_ZoneNullColorCopy').value;
		if ($('#te_ZoneNullColorCopy').val() == '') {
			te_PageValue.Zone.NullInfoZone.NullColor = '#808080'
		}
		
		switch($('#te_Zonelabel').is(":checked")) {
	    	case true : 
	    		gTxMap.RemoveLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01);
	        	if(gTxMap.GetLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01+"_label") != null) {
	        		gTxMap.RemoveLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01+"_label");
	        	}
	    		oLayer = gTxMap.TxZoneLayerCreate(Constants.TxGroupKey.TxAA01, 1, te_PageValue.LyrZoneContainer.layerName, te_PageValue.LyrZoneContainer.data, te_PageValue);
	    		gTxMap.AddLayer(oLayer);
	    		break;
	    	case false : 
	    		gTxMap.RemoveLayer("TxCongZone_"+Constants.TxGroupKey.TxAA01+"_label");
	    		break;
	    }
		dataChangeCheck_te = true;
	},
	simulLinkReSet : function() {
		var jipyoKind = 'te';
		var simulPageValue = TxJipyoSimulation.getPageValue(jipyoKind);
		var settingKind = simulPageValue.SettingKind;
		var step = simulPageValue.Step;
        var content = "";
        $("#"+ jipyoKind +"_classcontentTbody_Simul").width("101%");
        
        if(simulPageValue.Link.SimulLayer != null) {
        	$('#'+jipyoKind+'_SimulSet_AllWidth').attr('disabled', false);
        	$('#'+jipyoKind+'_SimulSet_AllWidth').prev().css('color', '#EF6461');
        	
        	for (var i = 1; i <= step; i++) {
        		content += '<tr>';
        		content += '<td style="width: 50px; padding-left: 11px;" name="jipyo_tableTD_'+i+'">';
        		content += '<div class="checkboxsett">';
        		content += '<input type="checkbox" value="1" id="'+jipyoKind+'_SimulSet_CheckBox_' + i + '_Link" name="'+jipyoKind+'_SimulSet_CheckBox_Link" checked = "checked"/>';
        		content += '<label for="'+jipyoKind+'_SimulSet_CheckBox_' + i + '_Link"></label>';
        		content += '</div>';
        		content += '</td>';
        		content += '<td style="width: 34px; padding-left: 11px; padding-top: 13px;" name="jipyo_tableTD_'+i+'">';
        		content += '<div class="tablecolorbox">';
        		content += '<div style="top:-9px; left:-13px; position:absolute">';
        		content += '<input id="'+jipyoKind+'_colorpickert_simul' + i + 'a" class="te_colorpickerts3" />';
        		content += '</div>';
        		content += '</div>';
        		content += '</td>';
        		content += '<td style="padding-left: 20px;" name="jipyo_tableTD_'+i+'">';
        		content += '<select name="'+jipyoKind+'_SimulSet_Width" class="select-style3" id="'+jipyoKind+'_SimulSet_Width_' + i + '_Link"  data-settings=' + '{"cutOff": 6}' + '>';
        		content += '<option value="10">10.0</option>';
        		content += '<option value="9">9.0</option>';
        		content += '<option value="8">8.0</option>';
        		content += '<option value="7">7.0</option>';
        		content += '<option value="6">6.0</option>';
        		content += '<option value="5">5.0</option>';
        		content += '<option value="4" selected="selected">4.0</option>';
        		content += '<option value="3">3.0</option>';
        		content += '<option value="2">2.0</option>';
        		content += '<option value="1">1.0</option>';
        		content += '</select>';
        		content += '</td>';
        		content += '<td class="valbox" style="padding:8px 0px 8px 11px" name="jipyo_tableTD_'+i+'">';
        		content += '<input type="text" name="'+jipyoKind+'_SimulSet_Min" id="'+jipyoKind+'_SimulSet_Min_' + i + '_Link" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
        		content += '</td>';
        		content += '<td class="valbox" style="padding:8px 0px 8px 17px" name="jipyo_tableTD_'+i+'">';
        		content += '<input type="text" name="'+jipyoKind+'_SimulSet_Max" id="'+jipyoKind+'_SimulSet_Max_' + i + '_Link" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
        		content += '</td>';
        		content += '</tr>'
        	}
        	$("#"+jipyoKind+"_classcontent_Simul_Link table tbody").html(content);
	        for (var i = 0; i < step; i++) {
	            $("#"+jipyoKind+"_SimulSet_CheckBox_" + (i + 1) + "_Link").prop('checked', simulPageValue.Link.SelectCriteria[i]);
	            $("#"+jipyoKind+"_colorpickert_simul" + (i + 1) + "a").spectrum({
	                color: simulPageValue.Link.Color[i],
	                showInput: true,
	                preferredFormat: "hex",
	            });
	            $("#"+jipyoKind+"_SimulSet_Width_" + (i + 1) + '_Link').val(simulPageValue.Link.Width[i]).prop("selected", true);
	            document.getElementById(jipyoKind+'_SimulSet_Min_' + (i + 1) + '_Link').value = simulPageValue.Link.UserCriteria.Min[i];
	            document.getElementById(jipyoKind+'_SimulSet_Max_' + (i + 1) + '_Link').value = simulPageValue.Link.UserCriteria.Max[i];
	        }
        } 
        $('[name=jipyo_tableTD_'+step+']').css('border-bottom', 'none');
        // 공통옵션 (정보없음, 너비일괄, 투명도, 재생속도)
        // 정보없음 체크, 색상
        $("#"+jipyoKind+"_SimulSet_NullColor").spectrum({
            color: simulPageValue.Link.NullColor,
            showInput: true,
            preferredFormat: "hex",
            change: function(color) {
            }
        });
       
        $("#"+jipyoKind+"_SimulSet_NullCheck").prop('checked', simulPageValue.Link.NullCheck);
        
        $('#'+jipyoKind+'_SimulSet_Opacity').val(simulPageValue.Link.Opacity);
        
        // 너비일괄
        $('#'+jipyoKind+'_SimulSet_AllWidth').val(simulPageValue.Link.WidthAll);
        $('#'+jipyoKind+'_SimulSet_DelayTime').val(simulPageValue.DelayTime);
	},
	simulZoneReSet: function() {
		var jipyoKind = 'te';
		var simulPageValue = TxJipyoSimulation.getPageValue(jipyoKind);
		var settingKind = simulPageValue.SettingKind;
		var step = simulPageValue.Step;
        var content = "";
        $("#"+ jipyoKind +"_classcontentTbody_Simul").width("101%");
        
        if(simulPageValue.Zone.SimulLayer != null) {
        	content = '';
        	for (var i = 1; i <= step; i++) {
    			content += '<tr>';
                content += '<td style="width: 46px; padding-left: 6px;" name="jipyo_tableTD_'+i+'">';
                content += '<div class="checkboxsett" Style="margin-left: 11px">';
                content += '<input type="checkbox" value="1" id="' + jipyoKind + '_SimulSet_CheckBox_' + i + '_Zone" name="'+jipyoKind+'_SimulSet_CheckBox_Zone" />';
                content += '<label for="'+jipyoKind+'_SimulSet_CheckBox_' + i + '_Zone"></label>';
                content += '</div>';
                content += '</td>';
                content += '<td style="width: 46px; padding-left: 22px; padding-top: 13px;" name="jipyo_tableTD_'+i+'">';
                content += '<div class="tablecolorbox" Style="margin-left: 11px">';
                content += '<div style="top:-9px; left:-13px; position:absolute">';
                content += '<input id="'+jipyoKind+'_colorpickert_simul' + i + 'b" class="te_colorpickerts4" />';
                content += '</div>';
                content += '</div>';
                content += '</td>';
                content += '<td class="valbox" style="width: 70px; padding:8px 0px 8px 36px" name="jipyo_tableTD_'+i+'">';
                content += '<input type="text" name="'+jipyoKind+'_SimulSet_Min" id = "'+jipyoKind+'_SimulSet_Min_' + i + '_Zone" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
                content += '</td>';
                content += '<td class="valbox" style="width: 46px; padding:8px 0px 8px 31px" name="jipyo_tableTD_'+i+'">';
                content += '<input type="text" name="'+jipyoKind+'_SimulSet_Max" id = "'+jipyoKind+'_SimulSet_Max_' + i + '_Zone" onfocus="javascript:second_map_event_YD.showKeyCode(this)" onfocusout="javascript:second_map_event_YD.showKeyUp(this)">';
                content += '</td>';
                content += '</tr>'
        	}
        	
        	$("#"+jipyoKind+"_classcontent_Simul_Zone table tbody").html(content);

        	for (var i = 0; i < step; i++) {
	            $("#"+jipyoKind+"_SimulSet_CheckBox_" + (i + 1) + "_Zone").prop('checked', simulPageValue.Zone.SelectCriteria[i]);
	            $("#"+jipyoKind+"_colorpickert_simul" + (i + 1) + "b").spectrum({
	                color: simulPageValue.Zone.Color[i],
	                showInput: true,
	                preferredFormat: "hex",
	            });
	            document.getElementById(jipyoKind+'_SimulSet_Min_' + (i + 1) + '_Zone').value = simulPageValue.Zone.UserCriteria.Min[i];
	            document.getElementById(jipyoKind+'_SimulSet_Max_' + (i + 1) + '_Zone').value = simulPageValue.Zone.UserCriteria.Max[i];
	        }
        }
        $('[name=jipyo_tableTD_'+step+']').css('border-bottom', 'none');
        // 공통옵션 (정보없음, 너비일괄, 투명도, 재생속도)
        // 정보없음 체크, 색상
        // john
        $("#"+jipyoKind+"_SimulSet_NullColor_zone").spectrum({
            color: simulPageValue.Zone.NullColor,
            showInput: true,
            preferredFormat: "hex",
            change: function(color) {
            }
        });
        $("#"+jipyoKind+"_SimulSet_NullCheck_zone").prop('checked', simulPageValue.Zone.NullCheck);
        
        $('#'+jipyoKind+'_SimulSet_Opacity_zone').val(simulPageValue.Zone.Opacity);
        
        // 너비일괄
        $('#'+jipyoKind+'_SimulSet_AllWidth').val(simulPageValue.Link.WidthAll);
        $('#'+jipyoKind+'_SimulSet_DelayTime').val(simulPageValue.DelayTime);
	}
};
var te_UtilJipyo = {
    JipyoMinMaxLink: function() {
        var strTableNameLink = 'link_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
        var strTableNameZone = 'zone_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
        var strFieldName = te_PageValue.JipyoCode + '_' + te_PageValue.Kikan + te_PageValue.Time;
        var oReqObj = {
            'DataBase': strTableNameLink,
            'DataBaseZone': strTableNameZone,
            'DBTable': strFieldName,
        }
        var strUrl = baseUrl + 'map/JiPyoMinMax.do';
        return TxAjax.JiPyoAjaxPromise(strUrl, oReqObj, te_fnCallerInitMinMax)
    },
    JipyoSelectMinMax: function() {
        var strTableNameLink = 'link_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
        var strTableNameZone = 'zone_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
        var strFieldName = te_PageValue.JipyoCode + '_' + te_PageValue.Kikan + te_PageValue.Time;
        var road_level = '';
        $("input[name=te_road_revel]:checked").each(function(i) {
            if (road_level == '') {
                road_level = $(this).val()
            } else {
                road_level += '\,' + $(this).val()
            }
        });
        if (road_level == '') {
            road_level = '101'
        }
        var strZoneType;
        var nZoneType = te_PageValue.ZoneType;
        if (te_PageValue.Year == '2014') {
            if (nZoneType == 0) {
                strZoneType = 'zone_sido_shp'
            } else if (nZoneType == 1) {
                strZoneType = 'zone_sido_shp'
            } else if (nZoneType == 2) {
                strZoneType = 'zone_sigungu_shp'
            } else if (nZoneType == 3) {
                strZoneType = 'zone_umd_shp'
            }
        } else {
            if (nZoneType == 0) {
                strZoneType = 'zone_sido_shp' + '_' + te_PageValue.Year
            } else if (nZoneType == 1) {
                strZoneType = 'zone_sido_shp' + '_' + te_PageValue.Year
            } else if (nZoneType == 2) {
                strZoneType = 'zone_sigungu_shp' + '_' + te_PageValue.Year
            } else if (nZoneType == 3) {
                strZoneType = 'zone_umd_shp' + '_' + te_PageValue.Year
            }
        }
        var oReqObj = {
            'DataBase': strTableNameLink,
            'DataBaseZone': strTableNameZone,
            'DBTable': strFieldName,
            'road_level': road_level,
            'Zone_select': strZoneType,
            'Years': gTxMap.Year()
        };
        te_PageValue.dataInfo = oReqObj;
        var strUrl = baseUrl + 'map/JiPyo_Select_MinMax.do';
        return TxAjax.JiPyoAjaxPromise(strUrl, oReqObj, te_fnCallerSelectRoadMinMax)
    },
    JipyoSelectZoneMinMax: function() {
    	var strTableNameLink = 'link_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
    	var strTableNameZone = 'zone_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
    	var strFieldName = te_PageValue.JipyoCode + '_' + te_PageValue.Kikan + te_PageValue.Time;
    	var road_level = '';
    	$("input[name=te_road_revel]:checked").each(function(i) {
    		if (road_level == '') {
    			road_level = $(this).val()
    		} else {
    			road_level += '\,' + $(this).val()
    		}
    	});
    	if (road_level == '') {
    		road_level = '101'
    	}
    	var strZoneType;
    	var nZoneType = te_PageValue.ZoneType;
    	if (te_PageValue.Year == '2014') {
    		if (nZoneType == 0) {
    			strZoneType = 'zone_sido_shp'
    		} else if (nZoneType == 1) {
    			strZoneType = 'zone_sido_shp'
    		} else if (nZoneType == 2) {
    			strZoneType = 'zone_sigungu_shp'
    		} else if (nZoneType == 3) {
    			strZoneType = 'zone_umd_shp'
    		}
    	} else {
    		if (nZoneType == 0) {
    			strZoneType = 'zone_sido_shp' + '_' + te_PageValue.Year
    		} else if (nZoneType == 1) {
    			strZoneType = 'zone_sido_shp' + '_' + te_PageValue.Year
    		} else if (nZoneType == 2) {
    			strZoneType = 'zone_sigungu_shp' + '_' + te_PageValue.Year
    		} else if (nZoneType == 3) {
    			strZoneType = 'zone_umd_shp' + '_' + te_PageValue.Year
    		}
    	}
    	var oReqObj = {
    			'DataBase': strTableNameLink,
    			'DataBaseZone': strTableNameZone,
    			'DBTable': strFieldName,
    			'road_level': road_level,
    			'Zone_select': strZoneType,
    			'Years': gTxMap.Year()
    	};
    	te_PageValue.dataInfo = oReqObj;
    	var strUrl = baseUrl + 'map/JiPyo_Select_MinMax.do';
    	return TxAjax.JiPyoAjaxPromise(strUrl, oReqObj, te_fnCallerSelectZoneMinMax)
    },
    teGradeLink: function() {
    	var road_level = '';
        $("input[name=te_road_revel]:checked").each(function(i) {
            if (road_level == '') {
                road_level = $(this).val()
            } else {
                road_level += '\,' + $(this).val()
            }
        });
        
        if (road_level == '') {
            return;
        }
    	
        var strTableNameLink = 'link_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
        var strFieldName = te_PageValue.JipyoCode + '_' + te_PageValue.Kikan + te_PageValue.Time;
        var step = $("#teStepRoad").val();
        var oReqObj = {
            'DataBase': strTableNameLink,
            'DBTable': strFieldName,
            'Years': InitYear,
            'step': step,
            'road_level': road_level
        };
        var strUrl = baseUrl + 'map/GradeLink.do';
        return TxAjax.JiPyoAjaxPromise(strUrl, oReqObj, te_fnTeGradeLink)
    },
    JipyoGradeLink: function(oPageValue, fnCaller) {
        var Time_Aadt = '';
        if (oPageValue.Time == "") {
            Time_Aadt = '_aadt'
        } else {
            Time_Aadt = '_time'
        }
        var strLegendLinkName = 'link_' + oPageValue.JipyoName + '_' + oPageValue.JipyoCode + '_' + oPageValue.Kikan + Time_Aadt;
        var oReqObj = {
            'legend_name': strLegendLinkName
        };
        var strUrl = baseUrl + 'map/JiPyo_Legend.do';
        TxAjax.JiPyoAjaxSync(strUrl, oReqObj, fnCaller)
    },
    jiPyoZoneBySelectRoadMinMax: function() {
        var strTableNameZone = 'zone_' + te_PageValue.JipyoName + '_' + te_PageValue.Year;
        var strFieldName = te_PageValue.JipyoCode + '_' + te_PageValue.Kikan + te_PageValue.Time;
        var road_level = '';
        $("input[name=te_zone_road_revel]:checked").each(function(i) {
            if (road_level == '') {
                road_level = $(this).val()
            } else {
                road_level += '\,' + $(this).val()
            }
        });
        if (road_level == '') {
            road_level = '101'
        }
        var zoneType = '';
        $('input[name=te_rb1]:checked').each(function(e) {
            zoneType = $(this).val().toUpperCase();
            if (zoneType == 'UMD') zoneType = 'EMD'
        });
        if (zoneType == '') {
            zoneType = 'sido'
        }
        var strZoneType;
        var nZoneType = te_PageValue.ZoneType;
        if (te_PageValue.Year == '2014') {
            if (nZoneType == 0) {
                strZoneType = 'zone_sido_shp'
            } else if (nZoneType == 1) {
                strZoneType = 'zone_sido_shp'
            } else if (nZoneType == 2) {
                strZoneType = 'zone_sigungu_shp'
            } else if (nZoneType == 3) {
                strZoneType = 'zone_umd_shp'
            }
        }else{
            if (nZoneType == 0) {
                strZoneType = 'zone_sido_shp' + '_' + te_PageValue.Year
            } else if (nZoneType == 1) {
                strZoneType = 'zone_sido_shp' + '_' + te_PageValue.Year
            } else if (nZoneType == 2) {
                strZoneType = 'zone_sigungu_shp' + '_' + te_PageValue.Year
            } else if (nZoneType == 3) {
                strZoneType = 'zone_umd_shp' + '_' + te_PageValue.Year
            }
        }
        var oReqObj = {
            'layerName': strTableNameZone,
            'period': strFieldName,
            'zoneSHP': strZoneType,
            'roadRank': road_level,
            'zoneType': zoneType,
            'Years': te_PageValue.Year
        };
        var strUrl = baseUrl + 'map/jiPyoZoneBySelectRoadMinMax.do';
        return TxAjax.JiPyoAjaxPromise(strUrl, oReqObj, te_fnCallerZoneBySelectRoadMinMax)
    },
    JipyoGradeZone: function() {
    	
        var strZoneType;
        var nZoneType = te_PageValue.ZoneType;
        if (nZoneType == 0) {
            strZoneType = 'zone_sido_'
        } else if (nZoneType == 1) {
            strZoneType = 'zone_sido_'
        } else if (nZoneType == 2) {
            strZoneType = 'zone_sigungu_'
        } else if (nZoneType == 3) {
            strZoneType = 'zone_umd_'
        }
        var Time_Aadt = '';
        if (te_PageValue.Time == "") {
            Time_Aadt = '_aadt'
        } else {
            Time_Aadt = '_time'
        }
        var strLegendZoneName = strZoneType + te_PageValue.JipyoName + '_' + te_PageValue.JipyoCode + '_' + te_PageValue.Kikan + Time_Aadt;
        var oReqObj = {
            'legend_name_Zone': strLegendZoneName
        };
        var strUrl = baseUrl + 'map/legend_name_Zone.do';
        
        return TxAjax.JiPyoAjaxPromise(strUrl, oReqObj, te_fnCallerInitDefaultGrade2)
    },
    teZoneCalculation: function() {    	
		var zoneType = '';
        var index = $('#te_sub_index').val();
        var period = $('input[name=te_rb]:checked').val();
        var roadRank = '-1';
        var period2;
        var oLayer;
        $('input[name=te_rb1]:checked').each(function(e) {
            zoneType = $(this).val().toUpperCase();
            if (zoneType == 'UMD') zoneType = 'EMD'
        });
        
        $("input[name=te_zone_road_revel]:checked").each(function(i) {
            if (roadRank == '-1') {
                roadRank = $(this).val()
            } else {
                roadRank += ',' + $(this).val()
            }
        });
        if (zoneType == '') {
            return
        }
        var request = {
        	'envName' : 'trafficvolume',
            'layerName': 'link_trafficvolume_sum_old',
            'time': $('#te_timezone').val(),
            'index': index,
            'period': period,
            'zoneType': zoneType,
            'roadRank': roadRank,
            'year': te_PageValue.Year,
        }
        var strUrl = baseUrl + 'map/teZoneCalculation.do';
            	
        return TxAjax.JiPyoAjaxPromise(strUrl, request, te_fnCallerZoneBySelectRoadMinMax)
	},
	teGradeZone: function() {
    	var zoneType = '';
        var index = $('#te_sub_index').val();
        var period = $('input[name=te_rb]:checked').val();
        var roadRank = '-1';
        var period2;
        var oLayer;
        $('input[name=te_rb1]:checked').each(function(e) {
            zoneType = $(this).val().toUpperCase();
            if (zoneType == 'UMD') zoneType = 'EMD'
        });
        
        $("input[name=te_zone_road_revel]:checked").each(function(i) {
            if (roadRank == '-1') {
                roadRank = $(this).val()
            } else {
                roadRank += ',' + $(this).val()
            }
        });
        if (zoneType == '') {
            return
        }
        var request = {
        	'envName' : 'trafficvolume',
            'layerName': 'link_trafficvolume_sum_old',
            'time': $('#te_timezone').val(),
            'index': index,
            'period': period,
            'zoneType': zoneType,
            'roadRank': roadRank,
            'year': te_PageValue.Year,
            'step' : $("#teStepArea").val()
        }
        var strUrl = baseUrl + 'map/teGradeZone.do';
            	
        return TxAjax.JiPyoAjaxPromise(strUrl, request, te_fnteGradeZone)
    }
};
var te_fnteGradeZone = function(result) {
	
    te_PageValue.Zone.Units = "대/일";
    var items = result.val;
    for (var i = 0; i < items.length - 1; i++) {
		var min_value = items[i];
		var max_value = items[i + 1];
		if (i == 0) {
			te_PageValue.Zone.Classification.Grade[i].Min = 0
		} else {
			te_PageValue.Zone.Classification.Grade[i].Min = min_value;
		}
		if (i + 1 == items.length - 1) {
			te_PageValue.Zone.Classification.Grade[i].Max = Math.ceil(max_value);
		} else {
			te_PageValue.Zone.Classification.Grade[i].Max = max_value;
		}
	}
    
    var s_items = result.s_val;
    
    TxJipyoSimulation.getPageValue('te').Zone.UserCriteria.Min = s_items.slice(0,s_items.length-1);
    TxJipyoSimulation.getPageValue('te').Zone.UserCriteria.Min[0] = 0;
	TxJipyoSimulation.getPageValue('te').Zone.UserCriteria.Max = s_items.slice(1,s_items.length);
	
    
    /*최초접속 여부 체크 함수 : 일단 보류*/
    /*if(isZoneFirst_te == true) {    	
    	isZoneFirst_te = false;
    }*/
};
var te_fnCallerInitMinMax = function(result) {
    te_PageValue.Road.MinMaxValue[0] = result.JiPyoMM[0].min;
    te_PageValue.Road.MinMaxValue[1] = result.JiPyoMM[0].max;
};
/*var te_fnCallerInitMinMaxYearChange = function(result) {
    te_PageValue.Road.MinMaxValue[0] = result.JiPyoMM[0].min;
    te_PageValue.Road.MinMaxValue[1] = result.JiPyoMM[0].max
};*/
var te_fnTeGradeLink = function(result) {
	
    te_PageValue.Road.Units = "대/일";
    var items = result.val;
    te_PageValue.Road.Scale.DispMin = items[0];
    te_PageValue.Road.Scale.DispMax= items[items.length-1];
	
	for (var i = 0; i < items.length - 1; i++) {
		var min_value = items[i];
		var max_value = items[i + 1];
		if (i == 0) {
			te_PageValue.Road.Classification.Grade[i].Min = "0"
		} else {
			te_PageValue.Road.Classification.Grade[i].Min = min_value.toString()
		}
		if (i + 1 == items.length - 1) {
			te_PageValue.Road.Classification.Grade[i].Max = Math.ceil(max_value).toString()
		} else {
			te_PageValue.Road.Classification.Grade[i].Max = max_value.toString()
		}
	}

	var s_items = result.s_val;
	TxJipyoSimulation.getPageValue('te').Link.UserCriteria.Min = s_items.slice(0,s_items.length-1);
	TxJipyoSimulation.getPageValue('te').Link.UserCriteria.Max = s_items.slice(1,s_items.length); 
}
var te_fnCallerInitDefaultGrade2 = function(result) {
    $('#teStepRoad option:eq(6)').prop('selected', true);
    if (te_PageValue.Road.Classification.Grade.length > 7) {
        $('.teInitLegend').trigger('click');
        $(".button_close").trigger("click")
    }
    var type = result.type;
    var name = '';
    if (result.type == 'Road') {
        name = 'JiPyoMMRodeLegend'
        if(!isLinkFirst_te) {
        	return;
        }
    } else if (result.type == 'Zone') {
        name = 'JiPyoMMZoneLegend'
    	if(!isZoneFirst_te) {
        	return;
        }
    }
    var str_te_UintLinkTmpSrc = result[name][0].unit;
    var str_te_UintLinkTmp = str_te_UintLinkTmpSrc.replace(/(\s*)/g, "");
    var n_te_UintLinkLength = str_te_UintLinkTmp.length;
    var str_te_UintLink = str_te_UintLinkTmp.substring(4, n_te_UintLinkLength - 1);
    te_PageValue[type].Units = str_te_UintLink;
    
    for (var i = 0; i < 5; i++) {
        var temp = 'col' + (i + 1);
        te_PageValue[type].Classification.Grade[i].Color = result[name][0][temp]
    }
    for (var j = 0; j < 5; j++) {
        var min = 'lev' + (j + 1);
        var max = 'lev' + (j + 2);
        if (j == 5 || j == 6) {
            te_PageValue[type].Classification.Grade[j].Min = '';
            te_PageValue[type].Classification.Grade[j].Max = ''
        } else {
            te_PageValue[type].Classification.Grade[j].Min = result[name][0][min];
            te_PageValue[type].Classification.Grade[j].Max = result[name][0][max]
        }
    }
    
    if(isLinkFirst_te == true) {    	
    	isLinkFirst_te = false;
    }
    
    if(isZoneFirst_te == true) {    	
    	isZoneFirst_te = false;
    }
};

var te_fnCallerSelectRoadMinMax = function(result) {
	te_PageValue.Road.MinMaxValue[2] = result.JiPyoMM[0].min;
    te_PageValue.Road.MinMaxValue[3] = result.JiPyoMM[0].max;
    
    var bSelectRaod = false;
    var oRoadType = te_PageValue.RoadType;
    for (var oKey in oRoadType) {
        var bChecked = oRoadType[oKey];
        if (bChecked == true) {
            bSelectRaod = true
        }
    }
    if (bSelectRaod == false) {
        te_PageValue.Road.MinMaxValue[2] = '';
        te_PageValue.Road.MinMaxValue[3] = ''
    }
};
var te_fnCallerSelectZoneMinMax = function(result) {
    te_PageValue.Zone.MinMaxValue[0] = result.JiPyoMMZone[0].min;
    te_PageValue.Zone.MinMaxValue[1] = result.JiPyoMMZone[0].max
};
var te_fnCallerZoneBySelectRoadMinMax = function(result) {
	te_PageValue.Zone.MinMaxValue[0] = result.valAll[0].min;
	te_PageValue.Zone.MinMaxValue[1] = result.valAll[0].max;
    te_PageValue.Zone.MinMaxValue[2] = result.val[0].min;
    te_PageValue.Zone.MinMaxValue[3] = result.val[0].max
}
$(document).ready(function() {
    $('button[name=teEqual]').click(function(e) {
        equalClick('te', $(this).val())
    });
    $("button[name=teLegendSave]").click(function(e) {
        var val = $(this).val();
        saveClick(te_PageValue, val, 'te')
    });
    $("#teLegendRoad").change(function() {
        readBlob(te_PageValue, "te_LinkeEtry,link");
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("msie") != -1) {
            $("#teLegendRoad").replaceWith($("#teLegendRoad").clone(true))
        } else {
            $("#teLegendRoad").prop("value", "")
        }
    });
    $("#teLegendArea").change(function() {
        readBlob(te_PageValue, "te_LinkeEtry,area");
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("msie") != -1) {
            $("#teLegendArea").replaceWith($("#teLegendArea").clone(true))
        } else {
            $("#teLegendArea").prop("value", "")
        }
    });
    $("button[name=teInitLegend]").click(function(e) {
        initClick(te_PageValue, $(this).val(), "te", "te_PageValue")
    });
    $("button[name=teInitSimulationLegend]").click(function(e) {
    	initClick(te_PageValue.Simulation, $(this).val(), "te", "te_PageValue")
    });
    $("select[name=teStep]").change(function(e) {
        var type = $(this).attr('id').substr($(this).attr('id').length - 4, 4);
        if (type == 'Area') type = 'Zone';
        stepClick(te_PageValue, $(this).val(), 'te', type)
    });
    $("#te_checkboxlayer5").click(function(event) {
        var te_bChecked = $(this).is(":checked");
        if (te_bChecked == true) {
        	if(!te_PageValue.Simulation.SimulCheck){
        		gTxMap.TxCongLayerVisible(Constants.TxGroupKey.TxAA01, true);
        	}else{
        		gTxMap.TxCongLayerVisible(Constants.TxGroupKey.TxAA01S, true);
        	}
            $(this).addClass("userClick")
        }
        if (te_bChecked == false) {
            gTxMap.TxCongLayerVisible(Constants.TxGroupKey.TxAA01, false);
            gTxMap.TxCongLayerVisible(Constants.TxGroupKey.TxAA01S, false);
            $(this).removeClass("userClick")
        }
    });
    $("#te_close").click(function(event) {
        gTxMap.TxCongLayerRemove(Constants.TxGroupKey.TxAA01)
        gTxMap.TxCongLayerRemove(Constants.TxGroupKey.TxAA01S);	// 지표시뮬레이션 닫기
        document.getElementById('trafficestimate').style.display='none';
    });
    var SelectRoadTF = $(this).is(":checked");
    $("#te_sub_index").change(function(event) {
    	te_PageValue.JipyoCode = $(this).val();
    	/*
        te_UtilJipyo.JipyoMinMaxLink(te_PageValue, te_fnCallerInitMinMax);
        te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectRoadMinMax);
        te_UtilJipyo.teGradeLink(te_PageValue, te_fnTeGradeLink);
        if (te_PageValue.ZoneType != 0) {
            te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectZoneMinMax);
            te_UtilJipyo.JipyoGradeZone(te_PageValue, te_fnCallerInitDefaultGrade2);
        }
        $("#te_checkboxlayer5").prop('checked', "checked");
        te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);
    */});
    $("input[name='te_rb']").change(function() {/*
        te_PageValue.Kikan = $(this).val();
        te_UtilJipyo.JipyoMinMaxLink(te_PageValue, te_fnCallerInitMinMax);
        te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectRoadMinMax);
        te_UtilJipyo.teGradeLink(te_PageValue, te_fnTeGradeLink);
        if (te_PageValue.ZoneType != 0) {
            te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectZoneMinMax);
            te_UtilJipyo.JipyoGradeZone(te_PageValue, te_fnCallerInitDefaultGrade2)
        }
        $("#te_checkboxlayer5").prop('checked', "checked");
        te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);
    */});
    $("#te_timezone").change(function(event) {/*
        te_PageValue.Time = $(this).val();
        te_UtilJipyo.JipyoMinMaxLink(te_PageValue, te_fnCallerInitMinMax);
        te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectRoadMinMax);
        te_UtilJipyo.teGradeLink(te_PageValue, te_fnTeGradeLink);
        if (te_PageValue.ZoneType != 0) {
            te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectZoneMinMax);
            te_UtilJipyo.JipyoGradeZone(te_PageValue, te_fnCallerInitDefaultGrade2)
        }
        $("#te_checkboxlayer5").prop('checked', "checked");
        te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);
    */});
    $("input[name=mapExpr]").click(function(event) {
        if ($('input[name=mapExpr]').is(':checked') == false) {
            event.preventDefault();
            return
        }
        $('input[type=checkbox][name=te_rb1]').prop("checked", false);
        $("input[name=te_road_revel]").prop("checked", false);
        $("#te_idctr101").prop("checked", true);
        $("#te_idctr102").prop("checked", true);
        $("#te_idctr103").prop("checked", true);
        $("#te_idctrAll").prop("checked", false);
        var layers = gTxMap.FindTxGroupLayer(Constants.TxGroupKey.TxAA01);
        if (layers.length != 0) {
            gTxMap.RemoveTxGroupLayer(Constants.TxGroupKey.TxAA01)
        }
        var mapExpr = '';
        $('input[name=mapExpr]:checked').each(function() {
            mapExpr += $(this).val()
        });
        if (mapExpr == 'road') {
            for (var i = 3; i < 6; i++) {
                $('label[for=te_rb' + i + ']').css('background-color', 'lightslategray');
                $('#te_rb' + i).prop("disabled", true)
            }
            $('#te_btnRoadSetOpen').prop('disabled', false);
            $('#te_btnZoneSetOpen').prop('disabled', true)
        } else {
            $("#te_rb5").prop("checked", true);
            for (var i = 3; i < 6; i++) {
                $('label[for=te_rb' + i + ']').css('background-color', '');
                $('#te_rb' + i).prop("disabled", false)
            }
            if (mapExpr == 'zone') {
                $('#te_btnRoadSetOpen').prop('disabled', true);
                $('#te_btnZoneSetOpen').prop('disabled', false)
            } else {
                $('#te_btnRoadSetOpen').prop('disabled', false);
                $('#te_btnZoneSetOpen').prop('disabled', false)
            }
        } te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue)
    });
    $("#te_idctrAll").on("click", function() {
        if ($(this).is(":checked")) {
            $("input[name=" + $(this).val() + "]").prop("checked", true)
        } else {
            $("input[name=" + $(this).val() + "]").prop("checked", false)
        }
        /*fnChangeChecked(te_PageValue, 'te');
        te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectRoadMinMax);
        $("#te_checkboxlayer5").prop('checked', "checked");
        te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);*/
    });
    $("input[name='te_road_revel']").change(function(event) {/*
        fnChangeChecked(te_PageValue, 'te');
        te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectRoadMinMax);
        $("#te_checkboxlayer5").prop('checked', "checked");
        te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);
    */});
    $("input[name='te_zone_road_revel']").change(function() {
        var CheckedCount = $("input[name='te_zone_road_revel']:checked").length;
        var checkedMaxLength = $("input[name='te_zone_road_revel']").length;
        if (checkedMaxLength != CheckedCount) {
            $("#te_ZoneAggAll").prop("checked", false)
        } else {
            $("#te_ZoneAggAll").prop("checked", true)
        }
        var roadType = $(this).val();
        if ($(this).is(':checked') == false) {
            $(this).removeAttr('checked')
        } else {
            $(this).attr('checked', 'checked')
        }
        // 분석조건 창에서 값이 바뀌면 지도 삭제, 상세설정 창 닫기(열려있다면), 분석하기 버튼 활성화
        dataChangeCheck_te = true;
        fn_confirmBtnStatus('able', 'te');
		if(document.getElementById("te_legned_prame").style.display != 'none') {
			$('#te_legned_prame').toggle();;
		}
    });
    $("#te_ZoneAggAll").on("click", function() {
        if ($(this).is(":checked")) {
            $("input[name=" + $(this).val() + "]").prop("checked", true)
        } else {
            $("input[name=" + $(this).val() + "]").prop("checked", false)
        }
        // 분석조건 창에서 값이 바뀌면 지도 삭제, 상세설정 창 닫기(열려있다면), 분석하기 버튼 활성화
        dataChangeCheck_te = true;
        fn_confirmBtnStatus('able', 'te');
		if(document.getElementById("te_legned_prame").style.display != 'none') {
			$('#te_legned_prame').toggle();;
		}
    });
    $("input[name='te_rb']").change(function() {
    	check_only(this, "te_rb");
        /*var ZoneType = $(this).val();
        var ZoneCheckCount = $("input[name='te_rb1']:checked").length;
        if (ZoneType == "sido") {
            te_PageValue.ZoneType = 1
        } else if (ZoneType == "sigungu") {
            te_PageValue.ZoneType = 2
        } else if (ZoneType == "umd") {
            te_PageValue.ZoneType = 3
        }
        if (ZoneCheckCount == 0) {
            te_PageValue.ZoneType = 0
        }
        if (te_PageValue.ZoneType != 0) {
            $('#te_btnZoneSetOpen').prop('disabled', false)
        }
        if (te_PageValue.ZoneType == 0) {
            $('#te_btnZoneSetOpen').prop('disabled', true)
        }
        te_UtilJipyo.JipyoSelectMinMax(te_PageValue, te_fnCallerSelectZoneMinMax);
        te_UtilJipyo.JipyoGradeZone(te_PageValue, te_fnCallerInitDefaultGrade2);
        $("#te_checkboxlayer5").prop('checked', "checked");
        te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);*/
    });
    $("#te_btnZoneSetOpen").click(function() {});
    $("#te_btnRoadSetOpen").click(function() {});
    $('input[name="te_rbs"]').change(function(e) {
        if ($(this).attr('id') == 'te_checkboxscale') {
            te_PageValue.RoadDispType = 0
        } else {
            te_PageValue.RoadDispType = 1
        }
    });
    $("#te_RoadSetApply").click(function(event) {
        var strCheckboxscale = $('input[name="te_rbs"]:checked').val();
        if (strCheckboxscale == 'Scale Width') {
            te_PageValue.RoadDispType = 0
        } else {
            te_PageValue.RoadDispType = 1
        }
        te_PageValue.Road.Scale.MinWidth = document.getElementById('te_WidthMinCopy').value;
        te_PageValue.Road.Scale.MaxWidth = document.getElementById('te_WidthMaxCopy').value;
        document.getElementById('te_PyoChoolMinCopy').value = (document.getElementById('te_PyoChoolMin').value).replace(/\,/g, '').split(".")[0];
        document.getElementById('te_PyoChoolMaxCopy').value = (document.getElementById('te_PyoChoolMax').value).replace(/\,/g, '').split(".")[0];
        te_PageValue.Road.Scale.DispMin = document.getElementById('te_PyoChoolMinCopy').value;
        te_PageValue.Road.Scale.DispMax = Number(document.getElementById('te_PyoChoolMaxCopy').value);
        document.getElementById('te_PyoChoolMin').value = Number(te_PageValue.Road.Scale.DispMin).toLocaleString('en').split(".")[0];
        document.getElementById('te_PyoChoolMax').value = Number(te_PageValue.Road.Scale.DispMax).toLocaleString('en').split(".")[0];
        te_PageValue.Road.Scale.Color = document.getElementById('te_ScaleWidthColorCopy').value;
        te_PageValue.Road.Scale.Opacity = document.getElementById('te_ScaleOpacity').value;
        te_PageValue.Road.LabelChecked = $('#te_Roadlabel').is(":checked");
        te_PageValue.Road.NullInfoLink.NullCheck = $('#te_RoadNullCheck').is(":checked");
        te_PageValue.Road.NullInfoLink.NullColor = document.getElementById('te_RoadNullColorCopy').value;
        te_PageValue.Road.Classification.Opacity = document.getElementById('te_ClassOpacityLink').value;
        te_PageValue.Road.Classification.WidthAll = document.getElementById('te_ClassGradeWidth_All').value;
        var ClassificationGradeCheckLink = te_PageValue.Road.Classification.Grade;
        var val = $("#teStepRoad").val();
        for (var i = 0; i < val; i++) {
            ClassificationGradeCheckLink[i].Select = $("#te_checkboxtable" + (i + 1) + "a").is(":checked");
            ClassificationGradeCheckLink[i].Color = $("#te_colorpickert" + (i + 1) + "a").spectrum('get').toHexString();
            ClassificationGradeCheckLink[i].Width = document.getElementById('te_ClassGradeWidth' + (i + 1)).value;
            ClassificationGradeCheckLink[i].Min = (document.getElementById("te_IxRangeMinLink" + (i + 1)).value).replace(/\,/g, '');
            ClassificationGradeCheckLink[i].Max = (document.getElementById("te_IxRangeMaxLink" + (i + 1)).value).replace(/\,/g, '');
            document.getElementById('te_IxRangeMinLink' + (i + 1)).value = Number(ClassificationGradeCheckLink[i].Min).toLocaleString('en').split(".")[0];
            document.getElementById('te_IxRangeMaxLink' + (i + 1)).value = Number(ClassificationGradeCheckLink[i].Max).toLocaleString('en').split(".")[0]
        }
        if (te_PageValue.draw == undefined) te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);
        else delete te_PageValue.draw
    });
    $("#te_DistrictSetApply").click(function(event) {
        $.each($('input[name=te_zone_road_revel]'), function(idx, val) {
            var roadType = $(this).val();
            if ($(this).is(':checked')) {
                te_PageValue.ZoneRoadType[roadType] = true
            } else {
                te_PageValue.ZoneRoadType[roadType] = false
            }
        });
        te_PageValue.Zone.Classification.Opacity = document.getElementById('te_ClassOpacityZone').value;
        var ClassificationGradeCheckZone = te_PageValue.Zone.Classification.Grade;
        var val = $("#teStepArea").val();
        for (var i = 0; i < val; i++) {
            ClassificationGradeCheckZone[i].Select = $("#te_checkboxtable" + (i + 1) + "b").is(":checked");
            ClassificationGradeCheckZone[i].Color = $("#te_colorpickert" + (i + 1) + "b").spectrum('get').toHexString();
            ClassificationGradeCheckZone[i].Min = (document.getElementById("te_IxRangeMinZone" + (i + 1)).value).replace(/\,/g, '');
            ClassificationGradeCheckZone[i].Max = (document.getElementById("te_IxRangeMaxZone" + (i + 1)).value).replace(/\,/g, '');
            document.getElementById('te_IxRangeMinZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Min).toLocaleString('en').split(".")[0];
            document.getElementById('te_IxRangeMaxZone' + (i + 1)).value = Number(ClassificationGradeCheckZone[i].Max).toLocaleString('en').split(".")[0]
        }
        te_PageValue.Zone.LabelChecked = $('#te_Zonelabel').is(":checked");
        te_PageValue.Zone.NullInfoZone.NullCheck = $('#te_ZoneNullCheck').is(":checked");
        te_PageValue.Zone.NullInfoZone.NullColor = document.getElementById('te_ZoneNullColorCopy').value;
        if (te_PageValue.draw == undefined) te_oJipyoMapDraw.TxJipyoMapDraw(te_PageValue);
        else delete te_PageValue.draw
    });
    $('#teSetroadbox').click(function() {
        if ($('#teZoneFrame').css('display') == 'none') {
            $('#teZoneFrame').css('display', 'block')
        } else {
            $('#teZoneFrame').css('display', 'none')
        }
    });
    $("#teBtnLgendRoadSetting").on("click", function() {
        $("button[name='teRoadCustom']:first").trigger("click");
        $(this).prop("disabled", true)
        $('#te_panelcover').css('display', 'block');
    });
    $("#teBtnLgendZoneSetting").on("click", function() {
        $("button[name='teZoneCustom']:first").trigger("click");
        $(this).prop("disabled", true)
        $('#te_panelcover').css('display', 'block');
    });
    $("button[name='teRoadCustom']").on("click", function(e) {
        te_PageValue.teCustomChart = new stackBarChart();
        te_PageValue.teCustomChart.setting("teStepRoad", "te_colorpickert", "a", "teCustomGraph", this, "road", te_PageValue);
        te_PageValue.teCustomChart.init()
    });
    $("button[name='teZoneCustom']").on("click", function(e) {
        var teCheckedLength = $("input[name=te_zone_road_revel]:checked").length;
        var road_level = '';
        $("input[name=te_zone_road_revel]:checked").each(function(i) {
            if (i == teCheckedLength - 1) {
                road_level += $(this).val()
            } else {
                road_level += $(this).val() + '\,'
            }
        });
        var zoneType = {
            1: "sido",
            2: "sigungu",
            3: "emd"
        }
        te_PageValue.dataInfo.ZoneType = zoneType[te_PageValue.ZoneType];
        te_PageValue.dataInfo.road_level = road_level;
        te_PageValue.teCustomZoneChart = new stackBarChart();
        te_PageValue.teCustomZoneChart.setting("teStepArea", "te_colorpickert", "b", "teCustomZoneGraph", this, "zone", te_PageValue);
        te_PageValue.teCustomZoneChart.init()
    });
    $("#btnTeGraphSubmit, #btnTeGraphZoneSubmit").on("click", function() {
        var listValue = null;
        var inputBoxMinID = null;
        var inputBoxMaxID = null;
        $("#teCustomGraphPaner").css("display", "none");
        $("#teCustomZoneGraphPaner").css("display", "none");
        $("#teBtnLgendRoadSetting").prop("disabled", false);
        $("#teBtnLgendZoneSetting").prop("disabled", false);
        if (this.id == "btnTeGraphSubmit") {
            listValue = te_PageValue.teCustomChart.getStepData();
            inputBoxMinID = "te_IxRangeMinLink";
            inputBoxMaxID = "te_IxRangeMaxLink";
            te_PageValue.teCustomChart.reset()
        } else {
            listValue = te_PageValue.teCustomZoneChart.getStepData();
            inputBoxMinID = "te_IxRangeMinZone";
            inputBoxMaxID = "te_IxRangeMaxZone";
            te_PageValue.teCustomZoneChart.reset()
        }
        for (var i = 1; i < listValue.length; i++) {
            $("#" + inputBoxMinID + (i)).val(listValue[i - 1]);
            $("#" + inputBoxMaxID + (i)).val(listValue[i])
        }
        
        $('#te_panelcover').css('display', 'none');
    });
    $("#btnTeGraphCancel, #btnTeGraphZoneCancel").on("click", function() {
        $("#teCustomGraphPaner").css("display", "none");
        $("#teCustomZoneGraphPaner").css("display", "none");
        $("#teBtnLgendRoadSetting").prop("disabled", false);
        $("#teBtnLgendZoneSetting").prop("disabled", false);
        if (this.id == "btnTeGraphCancel") {
            te_PageValue.teCustomChart.reset()
        } else {
            te_PageValue.teCustomZoneChart.reset()
        }
        
        $('#te_panelcover').css('display', 'none');
    })
    $('#te_ClassGradeWidth_All').on('change', function(){
    	var width = $(this).val();
    	$('select[name=te_ClassGradeWidth]').val(width);
    });
});
var te_oJipyoMapDraw = {
    GetLyrJipyoLink: function(oPageValue, type) {
    	return 	new Promise(function(resolve, reject) {
    		
    		var oLayer = null;
        	var index = $('#te_sub_index').val();
            var period = $('input[name=te_rb]:checked').val();
            var simulLegendName = 'Link_Lev5_TrafficVolume_' + oPageValue.Year + '_' + index + '_' + period;	// 변경 전의 index와 period 사용
            if (index == 'all') {
                index = 'total'
            } else if (index == 'car') {
                index = 'auto'
            }
            if (period == 'weekdays') {
                period = 'weekday'
            }
//            var layerName = 'Link_TrafficVolume_' + index + '_' + period + '_' + oPageValue.Year;
            var layerName = 'Link_TrafficVolume_' + index + '_' + period;
            var roadRank = '-1';
            $("input[name=te_road_revel]:checked").each(function(i) {
                if (roadRank == '-1') {
                    roadRank = $(this).val()
                } else {
                    roadRank += ',' + $(this).val()
                }
            });
            
            /* 시뮬레이션 레이어 생성, 시뮬레이션 페이지 밸류 설정 */
            oPageValue.Simulation.Year = oPageValue.Year;
            oPageValue.Simulation.TopGroupKey = Constants.TxGroupKey.TxAA01;
            oPageValue.Simulation.GroupKey = Constants.TxGroupKey.TxAA01S;
            oPageValue.Simulation.Kind = 'Link';
            
            oPageValue.Simulation.Link.SrvLayerName = layerName;
            oPageValue.Simulation.Link.LayerName = Constants.LayerName.TxAA01SL;
            oPageValue.Simulation.Link.LegendName = simulLegendName;
            oPageValue.Simulation.Link.RoadRank = roadRank;
    		
    		return TxJipyoSimulation.createLayer(oPageValue.Simulation, 'Link').then(function(result){
    			oPageValue.Simulation.Link.SimulLayer = result;
                
                var strSld = null;
             	 if (type == 'scale'){
             		strSld = TxSldTraEstScaleLink2(layerName, oPageValue); 
             	 }else{
             		strSld = TxSldTraEstClassLink2(layerName, oPageValue); 
             	 }
				let viewParams = 'year:' + oPageValue.Year;

				te_PageValue.LyrLinkContainer = {
					"layerName": layerName,
					"roadRank": roadRank,
					"strSld": strSld,
					"viewParams": viewParams
				};

				let params = {
					cqlParams: roadRank,
					viewParams: viewParams
				};
	             oLayer = gTxMap.TxRoadLayerCreate(Constants.TxGroupKey.TxAA01, 0, layerName, params, strSld);
	             resolve( oLayer );
    		})
    	})
    },
    GetLyrJipyoClassZone: function(oPageValue) {
    	return new Promise(function(resolve, reject) {
    		var zoneType = '';
            var index = $('#te_sub_index').val();
            var period = $('input[name=te_rb]:checked').val();
            var roadRank = '-1';
            var index2;
            var period2;
            var oLayer;
            var simulLegendName = 'link_lev5_trafficvolume_' + oPageValue.Year + '_' + index + '_' +period;
            $('input[name=te_rb1]:checked').each(function(e) {
                $(this).val().toUpperCase() == 'UMD' ? zoneType = 'EMD' : zoneType = $(this).val().toUpperCase()
            });
            if (index == 'all') {
                index2 = 'total'
            } else if (index == 'car') {
                index2 = 'auto'
            } else {
                index2 = index
            }
            if (period == 'weekdays') {
                period2 = 'weekday'
            } else {
                period2 = period
            }
            $("input[name=te_zone_road_revel]:checked").each(function(i) {
                if (roadRank == '-1') {
                    roadRank = $(this).val()
                } else {
                    roadRank += ',' + $(this).val()
                }
            });
            var request = {
                'layerName': 'link_lev6_trafficvolume',
                'time': $('#te_timezone').val(),
                'index': index,
                'period': period,
                'zoneType': zoneType,
                'roadRank': roadRank,
                'year': oPageValue.Year,
                'fnName': 'trafficvolume'
            }
            var strUrl = baseUrl + 'map/JiPyoZoneTeSum.do';
            $.ajax({
                url: strUrl,
                dataType: 'json',
                data: request,
                type: 'post',
                async: false,
                success: function(data) {
                    var layerName = 'ZONE_' + zoneType + '_TrafficVolume' + '_' + index2 + '_' + period2 + '_' + oPageValue.Year;
	                 
	                 oPageValue.Simulation.Year = oPageValue.Year;
	                 oPageValue.Simulation.TopGroupKey = Constants.TxGroupKey.TxAA01;
	                 oPageValue.Simulation.GroupKey = Constants.TxGroupKey.TxAA01S;
	                 oPageValue.Simulation.Kind = 'Zone';
	                 oPageValue.Simulation.Zone.ZoneType = zoneType.toLowerCase();
	                 oPageValue.Simulation.Zone.SrvLayerName = 'zone_' + zoneType.toLowerCase() + '_' + oPageValue.Year;
	                 oPageValue.Simulation.Zone.LayerName = Constants.LayerName.TxAA01SZ;	
	                 oPageValue.Simulation.Zone.LegendName = simulLegendName;
	                 oPageValue.Simulation.Zone.RoadRank = roadRank;
	                 
	                 TxAjax.JiPyoPromiseReady()
	                 .then(function(){
	                	 return TxJipyoSimulation.getZoneTimeValue_te(oPageValue.Simulation, request);
	                 })
	                 .then(function(){
	                	 return TxJipyoSimulation.createLayer(oPageValue.Simulation, 'Zone');
	                 })
	                 .then(function(result){
	                	oPageValue.Simulation.Zone.SimulLayer = result;
	                	
	                	te_PageValue.LyrZoneContainer = {
	                			"layerName" : layerName, 
	                			"data" : data
	                	}
			        	oLayer = gTxMap.TxZoneLayerCreate(Constants.TxGroupKey.TxAA01, 1, layerName, data, oPageValue);
			        	
			        	resolve( oLayer );
	                 })                    
                },
                error: function(error) {
                    alert('AjaxSync Exception : ' + error)
                }
            });
    	})
    },
    TxJipyoMapDraw: function() {
    	addInitPageVal(te_PageValue, "te_PageValue");
    	        
        /*var ZoneType = $('input[name=te_rb1]:checked').val();
        if (ZoneType == "sido") {
            te_PageValue.ZoneType = 1
        } else if (ZoneType == "sigungu") {
            te_PageValue.ZoneType = 2
        } else if (ZoneType == "umd") {
            te_PageValue.ZoneType = 3
        } else {
            te_PageValue.ZoneType = 0
        }*/
    	
    	var f_ProAjax = TxAjax.JiPyoPromiseReady();
        var nSelectRoadCnt = 0;
        $("input[name=te_road_revel]:checked").each(function(i) {
            nSelectRoadCnt++
        });
        
        fnSpeedCommon.fnZoneAssignment('te');
        
        var te_oLinkLyr = null;
        var te_oZoneLyr = null;
        
        /*var te_oZoneLyr = null;*/
        if (nSelectRoadCnt != 0 && te_PageValue.RoadDispType == 0) {
        	f_ProAjax = te_oJipyoMapDraw.GetLyrJipyoLink(te_PageValue, 'scale')
    		.then(function(result){
    			te_oLinkLyr = result;
    		});
        }
        if (nSelectRoadCnt != 0 && te_PageValue.RoadDispType == 1) {
        	f_ProAjax = te_oJipyoMapDraw.GetLyrJipyoLink(te_PageValue, 'class')
    		.then(function(result){
    			te_oLinkLyr = result;
    		});
        }
        /*if (te_PageValue.ZoneType != 0) {
            te_oZoneLyr = te_oJipyoMapDraw.GetLyrJipyoClassZone(te_PageValue);
            startTime = new Date()
        }*/
        if (te_PageValue.ZoneType != 0) {
    		f_ProAjax = te_oJipyoMapDraw.GetLyrJipyoClassZone(te_PageValue).then(function(result){
    			te_oZoneLyr = result;
    		})	
        }
        
        
        f_ProAjax.then(function(){
        	var te_vecLyr = [];
            var te_simul_vecLyr = [];
            
            if ((te_oZoneLyr != null) && (te_oLinkLyr != null)) {
                te_vecLyr.push(te_oZoneLyr);
                te_vecLyr.push(te_oLinkLyr);
                te_simul_vecLyr.push(te_PageValue.Simulation.Zone.SimulLayer);
                te_simul_vecLyr.push(te_PageValue.Simulation.Link.SimulLayer);
            }
            
            if ((te_oZoneLyr != null) && (te_oLinkLyr == null)) {
                te_vecLyr.push(te_oZoneLyr);
                te_simul_vecLyr.push(te_PageValue.Simulation.Zone.SimulLayer);
            }
            
            if ((te_oZoneLyr == null) && (te_oLinkLyr != null)) {
                te_vecLyr.push(te_oLinkLyr);
                te_simul_vecLyr.push(te_PageValue.Simulation.Link.SimulLayer);
            }
            
            te_PageValue.LyrContainer = te_vecLyr;
            te_PageValue.LyrContainer_simul = te_simul_vecLyr;
            gTxMap.SetTx0000Layer(Constants.TxGroupKey.TxAA01, te_vecLyr);
            gTxMap.SetTx0000Layer(Constants.TxGroupKey.TxAA01S, te_simul_vecLyr); 
            
            // 선택된 도로 없을시 해당지표 시뮬레이션 레이어 삭제
            if(nSelectRoadCnt == 0){
            	if(te_PageValue.Simulation.Playcheck){
    				TxJipyoSimulation.stop(te_PageValue.Simulation);
    			}
    			var layerName = te_PageValue.Simulation.Link.LayerName;
    			gTxMap.RemoveLayer(layerName);     			
    			te_PageValue.Simulation.Link.SimulLayer = null;
    		}
            
            // 선택된 행정구역 없을 시 해당지표 시뮬레이션 레이어 삭제
            if(te_PageValue.ZoneType == 0){
            	if(te_PageValue.Simulation.Playcheck){
            		TxJipyoSimulation.stop(te_PageValue.Simulation);
            	}
            	var layerName = te_PageValue.Simulation.Zone.LayerName;
            	gTxMap.RemoveLayer(layerName);
            	te_PageValue.Simulation.Zone.SimulLayer = null;
            }
            
            if(te_PageValue.Simulation.SimulCheck){
            	gTxMap.TxCongLayerVisible(Constants.TxGroupKey.TxAA01, false);
            } else {
            	gTxMap.TxCongLayerVisible(Constants.TxGroupKey.TxAA01S, false);
            }
            
            $('#LodingPanel').css("display", "none");
            Trafficestimate.fnClickLink();
            if(te_PageValue.ZoneType != 0){
            	Trafficestimate.fnClickZone();
            }            
            $('#te_SimulSetting').trigger('click');
            
            for (var i = 0; i <= 3; i++) {
      			var name;
      			if (i == 1)
      				name = 'SIDO';
      			else if (i == 2)
      				name = 'SIGUNGU';
      			else if (i == 3)
      				name = 'EMD';
      			te_PageValue.ZoneType = i;
      			addInitPageVal(te_PageValue, "te_PageValue_" + name)
      		}
            fnSpeedCommon.fnZoneAssignment('te');
        });
        /*var te_vecLyr = [];
        var te_simul_vecLyr = [];
        if ((te_oZoneLyr != null) && (te_oLinkLyr != null)) {
            te_vecLyr.push(te_oZoneLyr);
            te_vecLyr.push(te_oLinkLyr);
            te_simul_vecLyr.push(te_PageValue.Simulation.Zone.SimulLayer);
            te_simul_vecLyr.push(te_PageValue.Simulation.Link.SimulLayer);
        }
        if ((te_oZoneLyr != null) && (te_oLinkLyr == null)) {
            te_vecLyr.push(te_oZoneLyr);
            te_simul_vecLyr.push(te_PageValue.Simulation.Zone.SimulLayer);
        }
        if ((te_oZoneLyr == null) && (te_oLinkLyr != null)) {
            te_vecLyr.push(te_oLinkLyr);
            te_simul_vecLyr.push(te_PageValue.Simulation.Link.SimulLayer);
        }*/       
    }
};

//UI 변경하면서 추가된 코드(john)
$(document).ready(function() {
	$('#te_Panel').on("mouseenter",function(e){
		$(this).stop().css("opacity", "1");
	});

	$('#te_Panel').on("mouseleave",function(){
		$('#te_Panel').stop(false,true);
		$(".functionsubpanel.show").fadeTo(700, ($("#te_opacity_slider").slider("value")) /100);
	});
	
	$("#te_frameTopBar").mousedown(function() {
		$(this).parent().draggable({
			disabled: false,
			containment: ".map"
		})
	});

	$("#te_frameTopBar").mouseup(function() {
		$(this).parent().draggable({
			disabled: true,
		});
		var hasclass = $("#te_Panel").hasClass('ui-draggable');
		if (hasclass) {
			$("#te_Panel").removeClass('ui-draggable ui-draggable-handle ui-draggable-disabled ui-draggable-disabled')
		}
	});

	$('#te_opacity_slider').slider({
		value : 100,
		max : 100,
		min  : 10
	});

	$('#te_frameHidden').on('click', function(){
		let layersubwrap = document.querySelector('#'+this.id.split('_')[0]+'_layersubwrap');
		layersubwrap.classList.remove("active");
		layersubwrap.nextElementSibling.classList.remove("show");
	})

	$('#te_ExitFrame').on('click', function(){
		$('#te_close').trigger('click');
	})
	$("input[name='te_rb1']").change(function() {
    	check_only(this, "te_rb1");
    	if($("input[name='te_rb1']:checked").length == 0) {
    		$(".te_roadLevelBox").hide();
//    		$('#btnZoneFrame').css('display','none');
//    		$('#teZoneFrame').css('display','none');
//    		$('#analysisBox_te').css('height','459px');
    	} else {
    		$(".te_roadLevelBox").show();
//    		$('#btnZoneFrame').css('display','block');
//    		$('#teZoneFrame').css('display','block');
//    		$('#analysisBox_te').css('height','606px');
    	}
    })
	
	$("#te_setting_legned").on("click",function(){
		var simulPageValue = TxJipyoSimulation.getPageValue('te');
		var te_simulCheck = simulPageValue.SimulCheck;
		switch(te_simulCheck) {
			case true:
				var findSimulLayer = gTxMap.FindIdxTxGroupLayer(Constants.TxGroupKey.TxAA01S);
				if(findSimulLayer.length == 0) {
					MessageBox.ShowMessage('지도 표출 후 사용 가능합니다.\n※ 분석하기 버튼을 눌러주세요.');
					return;
				}
				break;
			case false:
				var findTimeLayer = gTxMap.FindIdxTxGroupLayer(Constants.TxGroupKey.TxAA01);
				if(findTimeLayer.length == 0) {
					MessageBox.ShowMessage('지도 표출 후 사용 가능합니다.\n※ 분석하기 버튼을 눌러주세요.');
					return;
				}
				break;
		}
		$("#te_legned_prame").toggle();
		
	});
	
	$('#te_confirm').on('click',function(){
		if($("input:checkbox[name=te_road_revel]:checked").length == 0 &&
		   $("input:checkbox[name=te_rb1]:checked").length == 0) {
			MessageBox.ShowMessage('분석조건을 선택해주세요(도로별/권역별 조건 중 적어도 한개).');
			return;
		}
		Trafficestimate.fnReDraw();
	});
	
	// 분석조건 창에서 값이 바뀌면 지도 삭제, 상세설정 창 닫기(열려있다면), 분석하기 버튼 활성화
	$("#te_sub_index, input[name='te_rb'], [name='te_timezone'], input[name='te_road_revel'], input[name='te_rb1']").on('change', function(){
		dataChangeCheck_te = true;
		fn_confirmBtnStatus('able', 'te');
		if(document.getElementById("te_legned_prame").style.display != 'none') {
			$('#te_legned_prame').toggle();;
		}
	});
	$('#te_idctrAll').on('click', function(){
		dataChangeCheck_te = true;
		fn_confirmBtnStatus('able', 'te');
		if(document.getElementById("te_legned_prame").style.display != 'none') {
			$('#te_legned_prame').toggle();;
		}
	});
	
	// 상세설정 값 변경시 자동 적용. 선택자  다르게 할 것(꼬일 수 있음)
	// 1.시간대별 보기-도로 설정 '자동 적용' (spectrum.js, commonMenu.js는 공통단이라 로직 짜면 안됨. 선택박스는 클래스 만들어 선택)
	$(document).on('change', '.te_chks, .te_colorpickerts, [name="te_ClassGradeWidth"], ' + 
			'#te_ClassGradeWidth_All, #te_ClassOpacityLink, ' +
			'#te_RoadNullCheck, #te_Roadlabel, #te_ScaleOpacity, #te_colorpickerr1', function(){
		
		Trafficestimate.timeRoadChangeEvent();
		//Trafficestimate.autoApply();
	});
	$('[name="te_rbs"]').on('change', function(){
		if(this.id == 'te_checkboxscale') {
			$('#te_roadInit_classification').css('display','none');
			$('#te_roadInit_proportional').css('display','block');
		} else {
			$('#te_roadInit_proportional').css('display','none');
			$('#te_roadInit_classification').css('display','block');
		};
		Trafficestimate.timeRoadChangeEvent();
	});
	$('#btnTeGraphSubmit').on('click', function(){
		$('#te_panelcover').css('display', 'none');
		Trafficestimate.timeRoadChangeEvent();
	});
	// 시간대별 단계 설정 이벤트
	$('#teStepRoad').on('change', function(){
		Trafficestimate.fnClickLink();
		Trafficestimate.timeRoadChangeEvent();
	});
	
	// 2.시간대별 보기-행정구역 설정 '자동적용'
	$(document).on('change', 'input[name="ckBoxTableb_te"], ' +
			'.te_colorpickerts2, ' +
			'#te_ClassOpacityZone, #te_ZoneNullCheck', function(){
		
		Trafficestimate.timeZoneChangeEvent();
	});
	$(document).on('change', '#te_Zonelabel', function(){
		Trafficestimate.timeZoneChangeEvent_label();
	});
	$('#btnTeGraphZoneSubmit').on('click', function(){
		$('#te_panelcover').css('display', 'none');
		Trafficestimate.timeZoneChangeEvent();
	});
	
	// 3.시뮬레이션 보기-도로 설정, 행정구역 설정 '자동 적용' (실행함수 동일, 최소, 최대값은 name 동일)
	$(document).on('change', 'input[name="te_SimulSet_CheckBox_Link"], .te_colorpickerts3, [name="te_SimulSet_Width"], ' +
			'#te_SimulSet_AllWidth, #te_SimulSet_Opacity, ' +
			'#te_SimulSet_NullCheck, ' +
			'input[name="te_SimulSet_CheckBox_Zone"], .te_colorpickerts4, ' +
			'#te_SimulSet_AllWidth2, #te_SimulSet_Opacity_zone, ' +
			'#te_SimulSet_NullCheck_zone', function(){
		//$('[name=jipyo_SimulSetteing_Apply]').trigger('click');
		TxJipyoSimulation.jipyo_SimulSetteing_Apply('te_SimulSetteing_Apply');
	});
	
	// 시뮬레이션 재생속도 변경 이벤트
	$('#te_SimulSet_DelayTime').on('change', function(){
		if($('#te_SimulPlay').hasClass('on')){
			var simulPageValue = TxJipyoSimulation.getPageValue('te');
			TxJipyoSimulation.stop(simulPageValue);
			te_PageValue.Simulation.DelayTime = $('#te_SimulSet_DelayTime').val();
			TxJipyoSimulation.play(simulPageValue);
		}
		te_PageValue.Simulation.DelayTime = $('#te_SimulSet_DelayTime').val();
	});
});

