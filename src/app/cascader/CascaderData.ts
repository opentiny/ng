export let foodList: any = [{
  label: '早饭',
  children: [
    { label: '包子',
      children: [
        { label: '南瓜包子' },
        { label: '茄子包子' },
        { label: '粉条包子' },
        { label: '豆沙包子' },
        { label: '豆角包子' },
        { label: '酸菜包子' },
        { label: '肉包子' },
        { label: '鸡肉包子' },
        { label: '牛肉包子' },
        { label: '羊肉包子' },
        { label: '鱼肉包子' }
      ]
    },
    { label: '油条' },
    { label: '豆腐脑',
      children: [
        { label: '甜豆腐脑' },
        { label: '咸豆腐脑' }
      ]
    },
    { label: '重庆小面' }
  ]
}, {
  label: '午饭',
  children: [
    { label: '面食',
      children: [
        { label: '油泼面' },
        { label: '干拌面' },
        { label: '刀削面' },
        { label: '拉面' },
        { label: '扯面' },
        { label: '棍棍面' },
        { label: '酸汤面' },
        { label: '旗花面' },
        { label: '凉面' },
        { label: '方便面' },
        { label: '火鸡面' }
      ]
    },
    { label: '酸菜鱼' },
    { label: '麻辣烫' },
    { label: '手抓饭' }
  ]
}, {
  label: '晚饭',
  children: [
    { label: '小菜',
      children: [
        { label: '芹菜' },
        { label: '菠菜' },
        { label: '豆芽' },
        { label: '腐竹' }
      ]
    },
    { label: '稀饭' },
    { label: '面条' },
    { label: '肠粉' }
  ]
}, {
  label: '西北风'
}];

export let CityData: any = [
  {
    label: '陕西省',
    children: [
      {
        label: '西安',
        children: [
          { label: '高陵县' },
          { label: '蓝田县' },
          { label: '户县' },
          { label: '周至县' },
          { label: '灞桥区' },
          { label: '长安区' },
          { label: '莲湖区' },
          { label: '临潼区' },
          { label: '未央区' },
          { label: '新城区' },
          { label: '阎良区' },
          { label: '雁塔区' },
          { label: '碑林区' },
          { label: '其它区' }
        ]
      },
      {
        label: '铜川',
        children: [
          { label: '铜川市' },
          { label: '宜君县' },
          { label: '王益区' },
          { label: '耀州区' },
          { label: '印台区' },
          { label: '其它区' }
        ]
      },
      {
        label: '宝鸡',
        children: [
          { label: '宝鸡市' },
          { label: '岐山县' },
          { label: '凤翔县' },
          { label: '太白县' },
          { label: '麟游县' },
          { label: '扶风县' },
          { label: '千阳县' },
          { label: '眉县' },
          { label: '凤县' },
          { label: '陇县' },
          { label: '陈仓区' },
          { label: '渭滨区' },
          { label: '金台区' },
          { label: '其它区' }
        ]
      },
      {
        label: '咸阳',
        children: [
          { label: '咸阳市' },
          { label: '兴平市' },
          { label: '礼泉县' },
          { label: '泾阳县' },
          { label: '彬县' },
          { label: '旬邑县' },
          { label: '长武县' },
          { label: '乾县' },
          { label: '武功县' },
          { label: '淳化县' },
          { label: '永寿县' },
          { label: '秦都区' },
          { label: '三原县' },
          { label: '渭城区' },
          { label: '杨凌区' },
          { label: '其它区' }
        ]
      },
      {
        label: '渭南',
        children: [
          { label: '渭南市' },
          { label: '韩城市' },
          { label: '华阴市' },
          { label: '潼关县' },
          { label: '白水县' },
          { label: '澄城县' },
          { label: '华县' },
          { label: '合阳县' },
          { label: '富平县' },
          { label: '大荔县' },
          { label: '蒲城县' },
          { label: '临渭区' },
          { label: '其它区' }
        ]
      },
      {
        label: '延安',
        children: [
          { label: '延安市' },
          { label: '安塞县' },
          { label: '洛川县' },
          { label: '宜川县' },
          { label: '子长县' },
          { label: '黄陵县' },
          { label: '延川县' },
          { label: '富县' },
          { label: '志丹县' },
          { label: '黄龙县' },
          { label: '吴起县' },
          { label: '宝塔区' },
          { label: '延长县' },
          { label: '甘泉县' },
          { label: '其它区' }
        ]
      },
      {
        label: '榆林',
        children: [
          { label: '榆林市' },
          { label: '清涧县' },
          { label: '绥德县' },
          { label: '子洲县' },
          { label: '靖边县' },
          { label: '横山县' },
          { label: '米脂县' },
          { label: '佳县' },
          { label: '吴堡县' },
          { label: '定边县' },
          { label: '府谷县' },
          { label: '神木县' },
          { label: '榆阳区' },
          { label: '其它区' }
        ]
      },
      {
        label: '汉中',
        children: [
          { label: '汉中市' },
          { label: '留坝县' },
          { label: '镇巴县' },
          { label: '汉台区' },
          { label: '城固县' },
          { label: '南郑县' },
          { label: '洋县' },
          { label: '宁强县' },
          { label: '佛坪县' },
          { label: '勉县' },
          { label: '西乡县' },
          { label: '略阳县' },
          { label: '其它区' }
        ]
      },
      {
        label: '安康',
        children: [
          { label: '安康市' },
          { label: '紫阳县' },
          { label: '岚皋县' },
          { label: '汉阴县' },
          { label: '旬阳县' },
          { label: '平利县' },
          { label: '石泉县' },
          { label: '镇坪县' },
          { label: '宁陕县' },
          { label: '白河县' },
          { label: '汉滨区' },
          { label: '其它区' }
        ]
      },
      {
        label: '商洛',
        children: [
          { label: '商洛市' },
          { label: '镇安县' },
          { label: '山阳县' },
          { label: '洛南县' },
          { label: '商南县' },
          { label: '丹凤县' },
          { label: '柞水县' },
          { label: '商州区' },
          { label: '其它区' }
        ]
      }
    ]
  }, {
    label: '山西省',
    children: [
      { label: '大同市',
        children: [
          {label: '城区' },
          {label: '大同县' },
          {label: '广灵县' },
          {label: '浑源县' },
          {label: '矿区' },
          {label: '灵丘县' },
          {label: '南郊区' },
          {label: '天镇县' },
          {label: '新荣区' },
          {label: '阳高县' },
          {label: '左云县' }
        ]
      }, {
        label: '晋城市',
        children: [
          {label: '城区' },
          {label: '高平市' },
          {label: '陵川县' },
          {label: '沁水县' },
          {label: '阳城县' },
          {label: '泽州县' }
        ]
      }, {
        label: '晋中市',
        children: [
          {label: '和顺县' },
          {label: '介休市' },
          {label: '灵石县' },
          {label: '平遥县' },
          {label: '祁县' },
          {label: '寿阳县' },
          {label: '太谷县' },
          {label: '昔阳县' },
          {label: '榆次区' },
          {label: '榆社县' },
          {label: '左权县' }
        ]
      }, {
        label: '临汾市',
        children: [
           {label: '安泽县' },
           {label: '大宁县' },
           {label: '汾西县' },
           {label: '浮山县' },
           {label: '古县' },
           {label: '洪洞县' },
           {label: '侯马市' },
           {label: '霍州市' },
           {label: '吉县' },
           {label: '蒲县' },
           {label: '曲沃县' },
           {label: '隰县' },
           {label: '乡宁县' },
           {label: '襄汾县' },
           {label: '尧都区' },
           {label: '翼城县' },
           {label: '永和县' }
        ]
      }, {
        label: '吕梁市',
        children: [
          {label: '方山县' },
          {label: '汾阳市' },
          {label: '交城县' },
          {label: '交口县' },
          {label: '岚县' },
          {label: '离石区' },
          {label: '临县' },
          {label: '柳林县' },
          {label: '石楼县' },
          {label: '文水县' },
          {label: '孝义市' },
          {label: '兴县' },
          {label: '中阳县' }
        ]
      }, {
        label: '朔州市',
        children: [
          {label: '怀仁县' },
          {label: '平鲁区' },
          {label: '山阴县' },
          {label: '朔城区' },
          {label: '应县' },
          {label: '右玉县' }
        ]
      }, {
        label: '太原市',
        children: [
          {label: '古交市' },
          {label: '尖草坪区' },
          {label: '晋源区' },
          {label: '娄烦县' },
          {label: '清徐县' },
          {label: '万柏林区' },
          {label: '小店区' },
          {label: '杏花岭区' },
          {label: '阳曲县' },
          {label: '迎泽区' }
        ]
      }, {
        label: '忻州市',
        children: [
          {label: '保德县' },
          {label: '代县' },
          {label: '定襄县' },
          {label: '繁峙县' },
          {label: '河曲县' },
          {label: '静乐县' },
          {label: '岢岚县' },
          {label: '宁武县' },
          {label: '偏关县' },
          {label: '神池县' },
          {label: '五台县' },
          {label: '五寨县' },
          {label: '忻府区' },
          {label: '原平市' }
        ]
      }, {
        label: '阳泉市',
        children: [
          {label: '城区' },
          {label: '郊区' },
          {label: '矿区' },
          {label: '平定县' },
          {label: '盂县' }
        ]
      }, {
        label: '运城市',
        children: [
          {label: '河津市' },
          {label: '稷山县' },
          {label: '绛县' },
          {label: '临猗县' },
          {label: '平陆县' },
          {label: '芮城县' },
          {label: '万荣县' },
          {label: '闻喜县' },
          {label: '夏县' },
          {label: '新绛县' },
          {label: '盐湖区' },
          {label: '永济市' },
          {label: '垣曲县' }
        ]
      }, {
        label: '长治市',
        children: [
          {label: '城区' },
          {label: '壶关县' },
          {label: '郊区' },
          {label: '黎城县' },
          {label: '潞城市' },
          {label: '平顺县' },
          {label: '沁县' },
          {label: '沁源县' },
          {label: '屯留县' },
          {label: '武乡县' },
          {label: '襄垣县' },
          {label: '长治县' },
          {label: '长子县' }
        ]
      }
    ]
  }
];

export const CascaderData: any = [{
  label: '常用端口',
  children: [
    { label: '全部放通' },
    { label: '全放通TCP' },
    { label: '全放通UCP' },
    { label: 'SSH' },
    { label: 'Telnet' },
    { label: 'RDP' },
    { label: 'PING' }
  ]
}, {
  label: '基本协议',
  children: [
    { label: 'HTTP' },
    { label: 'HTTPS' },
    { label: 'WWW' },
    { label: 'FTP' },
    { label: 'MS SQL' },
    { label: 'My SQL' },
    { label: 'PostgreSQL' },
    { label: 'Oracle' }
  ]
}];

export let ProvinceCityData: any = [
  {
    code: '11',
    label: '北京市'
  },
  {
    code: '12',
    label: '天津市'
  },
  {
    code: '13',
    label: '河北省',
    children: [
      { code: '1301', label: '石家庄市' },
      { code: '1302', label: '唐山市' },
      { code: '1303', label: '秦皇岛市' },
      { code: '1304', label: '邯郸市' },
      { code: '1305', label: '邢台市' },
      { code: '1306', label: '保定市' },
      { code: '1307', label: '张家口市' },
      { code: '1308', label: '承德市' },
      { code: '1309', label: '沧州市' },
      { code: '1310', label: '廊坊市' },
      { code: '1311', label: '衡水市' }
    ]
  },
  {
    code: '14',
    label: '山西省',
    children: [
      { code: '1401', label: '太原市' },
      { code: '1402', label: '大同市' },
      { code: '1403', label: '阳泉市' },
      { code: '1404', label: '长治市' },
      { code: '1405', label: '晋城市' },
      { code: '1406', label: '朔州市' },
      { code: '1407', label: '晋中市' },
      { code: '1408', label: '运城市' },
      { code: '1409', label: '忻州市' },
      { code: '1410', label: '临汾市' },
      { code: '1411', label: '吕梁市' }
    ]
  },
  {
    code: '15',
    label: '内蒙古自治区',
    children: [
      { code: '1501', label: '呼和浩特市' },
      { code: '1502', label: '包头市' },
      { code: '1503', label: '乌海市' },
      { code: '1504', label: '赤峰市' },
      { code: '1505', label: '通辽市' },
      { code: '1506', label: '鄂尔多斯市' },
      { code: '1507', label: '呼伦贝尔市' },
      { code: '1508', label: '巴彦淖尔市' },
      { code: '1509', label: '乌兰察布市' },
      { code: '1522', label: '兴安盟' },
      { code: '1525', label: '锡林郭勒盟' },
      { code: '1529', label: '阿拉善盟' }
    ]
  },
  {
    code: '21',
    label: '辽宁省',
    children: [
      { code: '2101', label: '沈阳市' },
      { code: '2102', label: '大连市' },
      { code: '2103', label: '鞍山市' },
      { code: '2104', label: '抚顺市' },
      { code: '2105', label: '本溪市' },
      { code: '2106', label: '丹东市' },
      { code: '2107', label: '锦州市' },
      { code: '2108', label: '营口市' },
      { code: '2109', label: '阜新市' },
      { code: '2110', label: '辽阳市' },
      { code: '2111', label: '盘锦市' },
      { code: '2112', label: '铁岭市' },
      { code: '2113', label: '朝阳市' },
      { code: '2114', label: '葫芦岛市' }
    ]
  },
  {
    code: '22',
    label: '吉林省',
    children: [
      { code: '2201', label: '长春市' },
      { code: '2202', label: '吉林市' },
      { code: '2203', label: '四平市' },
      { code: '2204', label: '辽源市' },
      { code: '2205', label: '通化市' },
      { code: '2206', label: '白山市' },
      { code: '2207', label: '松原市' },
      { code: '2208', label: '白城市' },
      { code: '2224', label: '延边朝鲜族自治州' }
    ]
  },
  {
    code: '23',
    label: '黑龙江省',
    children: [
      { code: '2301', label: '哈尔滨市' },
      { code: '2302', label: '齐齐哈尔市' },
      { code: '2303', label: '鸡西市' },
      { code: '2304', label: '鹤岗市' },
      { code: '2305', label: '双鸭山市' },
      { code: '2306', label: '大庆市' },
      { code: '2307', label: '伊春市' },
      { code: '2308', label: '佳木斯市' },
      { code: '2309', label: '七台河市' },
      { code: '2310', label: '牡丹江市' },
      { code: '2311', label: '黑河市' },
      { code: '2312', label: '绥化市' },
      { code: '2327', label: '大兴安岭地区' }
    ]
  },
  {
    code: '31',
    label: '上海市',
    children: [
      { code: '310101', label: '黄浦区' },
      { code: '310104', label: '徐汇区' },
      { code: '310105', label: '长宁区' },
      { code: '310106', label: '静安区' },
      { code: '310107', label: '普陀区' },
      { code: '310109', label: '虹口区' },
      { code: '310110', label: '杨浦区' },
      { code: '310112', label: '闵行区' },
      { code: '310113', label: '宝山区' },
      { code: '310114', label: '嘉定区' },
      { code: '310115', label: '浦东新区' },
      { code: '310116', label: '金山区' },
      { code: '310117', label: '松江区' },
      { code: '310118', label: '青浦区' },
      { code: '310120', label: '奉贤区' },
      { code: '310151', label: '崇明区' }
    ]
  },
  {
    code: '32',
    label: '江苏省',
    children: [
      { code: '3201', label: '南京市' },
      { code: '3202', label: '无锡市' },
      { code: '3203', label: '徐州市' },
      { code: '3204', label: '常州市' },
      { code: '3205', label: '苏州市' },
      { code: '3206', label: '南通市' },
      { code: '3207', label: '连云港市' },
      { code: '3208', label: '淮安市' },
      { code: '3209', label: '盐城市' },
      { code: '3210', label: '扬州市' },
      { code: '3211', label: '镇江市' },
      { code: '3212', label: '泰州市' },
      { code: '3213', label: '宿迁市' }
    ]
  },
  {
    code: '33',
    label: '浙江省',
    children: [
      { code: '3301', label: '杭州市' },
      { code: '3302', label: '宁波市' },
      { code: '3303', label: '温州市' },
      { code: '3304', label: '嘉兴市' },
      { code: '3305', label: '湖州市' },
      { code: '3306', label: '绍兴市' },
      { code: '3307', label: '金华市' },
      { code: '3308', label: '衢州市' },
      { code: '3309', label: '舟山市' },
      { code: '3310', label: '台州市' },
      { code: '3311', label: '丽水市' }
    ]
  },
  {
    code: '34',
    label: '安徽省',
    children: [
      { code: '3401', label: '合肥市' },
      { code: '3402', label: '芜湖市' },
      { code: '3403', label: '蚌埠市' },
      { code: '3404', label: '淮南市' },
      { code: '3405', label: '马鞍山市' },
      { code: '3406', label: '淮北市' },
      { code: '3407', label: '铜陵市' },
      { code: '3408', label: '安庆市' },
      { code: '3410', label: '黄山市' },
      { code: '3411', label: '滁州市' },
      { code: '3412', label: '阜阳市' },
      { code: '3413', label: '宿州市' },
      { code: '3415', label: '六安市' },
      { code: '3416', label: '亳州市' },
      { code: '3417', label: '池州市' },
      { code: '3418', label: '宣城市' }
    ]
  },
  {
    code: '35',
    label: '福建省',
    children: [
      { code: '3501', label: '福州市' },
      { code: '3502', label: '厦门市' },
      { code: '3503', label: '莆田市' },
      { code: '3504', label: '三明市' },
      { code: '3505', label: '泉州市' },
      { code: '3506', label: '漳州市' },
      { code: '3507', label: '南平市' },
      { code: '3508', label: '龙岩市' },
      { code: '3509', label: '宁德市' }
    ]
  },
  {
    code: '36',
    label: '江西省',
    children: [
      { code: '3601', label: '南昌市' },
      { code: '3602', label: '景德镇市' },
      { code: '3603', label: '萍乡市' },
      { code: '3604', label: '九江市' },
      { code: '3605', label: '新余市' },
      { code: '3606', label: '鹰潭市' },
      { code: '3607', label: '赣州市' },
      { code: '3608', label: '吉安市' },
      { code: '3609', label: '宜春市' },
      { code: '3610', label: '抚州市' },
      { code: '3611', label: '上饶市' }
    ]
  },
  {
    code: '37',
    label: '山东省',
    children: [
      { code: '3701', label: '济南市' },
      { code: '3702', label: '青岛市' },
      { code: '3703', label: '淄博市' },
      { code: '3704', label: '枣庄市' },
      { code: '3705', label: '东营市' },
      { code: '3706', label: '烟台市' },
      { code: '3707', label: '潍坊市' },
      { code: '3708', label: '济宁市' },
      { code: '3709', label: '泰安市' },
      { code: '3710', label: '威海市' },
      { code: '3711', label: '日照市' },
      { code: '3713', label: '临沂市' },
      { code: '3714', label: '德州市' },
      { code: '3715', label: '聊城市' },
      { code: '3716', label: '滨州市' },
      { code: '3717', label: '菏泽市' }
    ]
  },
  {
    code: '41',
    label: '河南省',
    children: [
      { code: '4101', label: '郑州市' },
      { code: '4102', label: '开封市' },
      { code: '4103', label: '洛阳市' },
      { code: '4104', label: '平顶山市' },
      { code: '4105', label: '安阳市' },
      { code: '4106', label: '鹤壁市' },
      { code: '4107', label: '新乡市' },
      { code: '4108', label: '焦作市' },
      { code: '4109', label: '濮阳市' },
      { code: '4110', label: '许昌市' },
      { code: '4111', label: '漯河市' },
      { code: '4112', label: '三门峡市' },
      { code: '4113', label: '南阳市' },
      { code: '4114', label: '商丘市' },
      { code: '4115', label: '信阳市' },
      { code: '4116', label: '周口市' },
      { code: '4117', label: '驻马店市' },
      { code: '419001', label: '济源市' }
    ]
  },
  {
    code: '42',
    label: '湖北省',
    children: [
      { code: '4201', label: '武汉市' },
      { code: '4202', label: '黄石市' },
      { code: '4203', label: '十堰市' },
      { code: '4205', label: '宜昌市' },
      { code: '4206', label: '襄阳市' },
      { code: '4207', label: '鄂州市' },
      { code: '4208', label: '荆门市' },
      { code: '4209', label: '孝感市' },
      { code: '4210', label: '荆州市' },
      { code: '4211', label: '黄冈市' },
      { code: '4212', label: '咸宁市' },
      { code: '4213', label: '随州市' },
      { code: '4228', label: '恩施土家族苗族自治州' },
      { code: '429004', label: '仙桃市' },
      { code: '429005', label: '潜江市' },
      { code: '429006', label: '天门市' },
      { code: '429021', label: '神农架林区' }
    ]
  },
  {
    code: '43',
    label: '湖南省',
    children: [
      { code: '4301', label: '长沙市' },
      { code: '4302', label: '株洲市' },
      { code: '4303', label: '湘潭市' },
      { code: '4304', label: '衡阳市' },
      { code: '4305', label: '邵阳市' },
      { code: '4306', label: '岳阳市' },
      { code: '4307', label: '常德市' },
      { code: '4308', label: '张家界市' },
      { code: '4309', label: '益阳市' },
      { code: '4310', label: '郴州市' },
      { code: '4311', label: '永州市' },
      { code: '4312', label: '怀化市' },
      { code: '4313', label: '娄底市' },
      { code: '4331', label: '湘西土家族苗族自治州' }
    ]
  },
  {
    code: '44',
    label: '广东省',
    children: [
      { code: '4401', label: '广州市' },
      { code: '4402', label: '韶关市' },
      { code: '4403', label: '深圳市' },
      { code: '4404', label: '珠海市' },
      { code: '4405', label: '汕头市' },
      { code: '4406', label: '佛山市' },
      { code: '4407', label: '江门市' },
      { code: '4408', label: '湛江市' },
      { code: '4409', label: '茂名市' },
      { code: '4412', label: '肇庆市' },
      { code: '4413', label: '惠州市' },
      { code: '4414', label: '梅州市' },
      { code: '4415', label: '汕尾市' },
      { code: '4416', label: '河源市' },
      { code: '4417', label: '阳江市' },
      { code: '4418', label: '清远市' },
      { code: '4419', label: '东莞市' },
      { code: '4420', label: '中山市' },
      { code: '4451', label: '潮州市' },
      { code: '4452', label: '揭阳市' },
      { code: '4453', label: '云浮市' }
    ]
  },
  {
    code: '45',
    label: '广西壮族自治区',
    children: [
      { code: '4501', label: '南宁市' },
      { code: '4502', label: '柳州市' },
      { code: '4503', label: '桂林市' },
      { code: '4504', label: '梧州市' },
      { code: '4505', label: '北海市' },
      { code: '4506', label: '防城港市' },
      { code: '4507', label: '钦州市' },
      { code: '4508', label: '贵港市' },
      { code: '4509', label: '玉林市' },
      { code: '4510', label: '百色市' },
      { code: '4511', label: '贺州市' },
      { code: '4512', label: '河池市' },
      { code: '4513', label: '来宾市' },
      { code: '4514', label: '崇左市' }
    ]
  },
  {
    code: '46',
    label: '海南省',
    children: [
      { code: '4601', label: '海口市' },
      { code: '4602', label: '三亚市' },
      { code: '4603', label: '三沙市' },
      { code: '4604', label: '儋州市' },
      { code: '469001', label: '五指山市' },
      { code: '469002', label: '琼海市' },
      { code: '469005', label: '文昌市' },
      { code: '469006', label: '万宁市' },
      { code: '469007', label: '东方市' },
      { code: '469021', label: '定安县' },
      { code: '469022', label: '屯昌县' },
      { code: '469023', label: '澄迈县' },
      { code: '469024', label: '临高县' },
      { code: '469025', label: '白沙黎族自治县' },
      { code: '469026', label: '昌江黎族自治县' },
      { code: '469027', label: '乐东黎族自治县' },
      { code: '469028', label: '陵水黎族自治县' },
      { code: '469029', label: '保亭黎族苗族自治县' },
      { code: '469030', label: '琼中黎族苗族自治县' }
    ]
  },
  {
    code: '50',
    label: '重庆市',
    children: [
      { code: '500101', label: '万州区' },
      { code: '500102', label: '涪陵区' },
      { code: '500103', label: '渝中区' },
      { code: '500104', label: '大渡口区' },
      { code: '500105', label: '江北区' },
      { code: '500106', label: '沙坪坝区' },
      { code: '500107', label: '九龙坡区' },
      { code: '500108', label: '南岸区' },
      { code: '500109', label: '北碚区' },
      { code: '500110', label: '綦江区' },
      { code: '500111', label: '大足区' },
      { code: '500112', label: '渝北区' },
      { code: '500113', label: '巴南区' },
      { code: '500114', label: '黔江区' },
      { code: '500115', label: '长寿区' },
      { code: '500116', label: '江津区' },
      { code: '500117', label: '合川区' },
      { code: '500118', label: '永川区' },
      { code: '500119', label: '南川区' },
      { code: '500120', label: '璧山区' },
      { code: '500151', label: '铜梁区' },
      { code: '500152', label: '潼南区' },
      { code: '500153', label: '荣昌区' },
      { code: '500154', label: '开州区' },
      { code: '500155', label: '梁平区' },
      { code: '500156', label: '武隆区' },
      { code: '500229', label: '城口县' },
      { code: '500230', label: '丰都县' },
      { code: '500231', label: '垫江县' },
      { code: '500233', label: '忠县' },
      { code: '500235', label: '云阳县' },
      { code: '500236', label: '奉节县' },
      { code: '500237', label: '巫山县' },
      { code: '500238', label: '巫溪县' },
      { code: '500240', label: '石柱土家族自治县' },
      { code: '500241', label: '秀山土家族苗族自治县' },
      { code: '500242', label: '酉阳土家族苗族自治县' },
      { code: '500243', label: '彭水苗族土家族自治县' }
    ]
  },
  {
    code: '51',
    label: '四川省',
    children: [
      { code: '5101', label: '成都市' },
      { code: '5103', label: '自贡市' },
      { code: '5104', label: '攀枝花市' },
      { code: '5105', label: '泸州市' },
      { code: '5106', label: '德阳市' },
      { code: '5107', label: '绵阳市' },
      { code: '5108', label: '广元市' },
      { code: '5109', label: '遂宁市' },
      { code: '5110', label: '内江市' },
      { code: '5111', label: '乐山市' },
      { code: '5113', label: '南充市' },
      { code: '5114', label: '眉山市' },
      { code: '5115', label: '宜宾市' },
      { code: '5116', label: '广安市' },
      { code: '5117', label: '达州市' },
      { code: '5118', label: '雅安市' },
      { code: '5119', label: '巴中市' },
      { code: '5120', label: '资阳市' },
      { code: '5132', label: '阿坝藏族羌族自治州' },
      { code: '5133', label: '甘孜藏族自治州' },
      { code: '5134', label: '凉山彝族自治州' }
    ]
  },
  {
    code: '52',
    label: '贵州省',
    children: [
      { code: '5201', label: '贵阳市' },
      { code: '5202', label: '六盘水市' },
      { code: '5203', label: '遵义市' },
      { code: '5204', label: '安顺市' },
      { code: '5205', label: '毕节市' },
      { code: '5206', label: '铜仁市' },
      { code: '5223', label: '黔西南布依族苗族自治州' },
      { code: '5226', label: '黔东南苗族侗族自治州' },
      { code: '5227', label: '黔南布依族苗族自治州' }
    ]
  },
  {
    code: '53',
    label: '云南省',
    children: [
      { code: '5301', label: '昆明市' },
      { code: '5303', label: '曲靖市' },
      { code: '5304', label: '玉溪市' },
      { code: '5305', label: '保山市' },
      { code: '5306', label: '昭通市' },
      { code: '5307', label: '丽江市' },
      { code: '5308', label: '普洱市' },
      { code: '5309', label: '临沧市' },
      { code: '5323', label: '楚雄彝族自治州' },
      { code: '5325', label: '红河哈尼族彝族自治州' },
      { code: '5326', label: '文山壮族苗族自治州' },
      { code: '5328', label: '西双版纳傣族自治州' },
      { code: '5329', label: '大理白族自治州' },
      { code: '5331', label: '德宏傣族景颇族自治州' },
      { code: '5333', label: '怒江傈僳族自治州' },
      { code: '5334', label: '迪庆藏族自治州' }
    ]
  },
  {
    code: '54',
    label: '西藏自治区',
    children: [
      { code: '5401', label: '拉萨市' },
      { code: '5402', label: '日喀则市' },
      { code: '5403', label: '昌都市' },
      { code: '5404', label: '林芝市' },
      { code: '5405', label: '山南市' },
      { code: '5406', label: '那曲市' },
      { code: '5425', label: '阿里地区' }
    ]
  },
  {
    code: '61',
    label: '陕西省',
    children: [
      { code: '6101', label: '西安市' },
      { code: '6102', label: '铜川市' },
      { code: '6103', label: '宝鸡市' },
      { code: '6104', label: '咸阳市' },
      { code: '6105', label: '渭南市' },
      { code: '6106', label: '延安市' },
      { code: '6107', label: '汉中市' },
      { code: '6108', label: '榆林市' },
      { code: '6109', label: '安康市' },
      { code: '6110', label: '商洛市' }
    ]
  },
  {
    code: '62',
    label: '甘肃省',
    children: [
      { code: '6201', label: '兰州市' },
      { code: '6202', label: '嘉峪关市' },
      { code: '6203', label: '金昌市' },
      { code: '6204', label: '白银市' },
      { code: '6205', label: '天水市' },
      { code: '6206', label: '武威市' },
      { code: '6207', label: '张掖市' },
      { code: '6208', label: '平凉市' },
      { code: '6209', label: '酒泉市' },
      { code: '6210', label: '庆阳市' },
      { code: '6211', label: '定西市' },
      { code: '6212', label: '陇南市' },
      { code: '6229', label: '临夏回族自治州' },
      { code: '6230', label: '甘南藏族自治州' }
    ]
  },
  {
    code: '63',
    label: '青海省',
    children: [
      { code: '6301', label: '西宁市' },
      { code: '6302', label: '海东市' },
      { code: '6322', label: '海北藏族自治州' },
      { code: '6323', label: '黄南藏族自治州' },
      { code: '6325', label: '海南藏族自治州' },
      { code: '6326', label: '果洛藏族自治州' },
      { code: '6327', label: '玉树藏族自治州' },
      { code: '6328', label: '海西蒙古族藏族自治州' }
    ]
  },
  {
    code: '64',
    label: '宁夏回族自治区',
    children: [
      { code: '6401', label: '银川市' },
      { code: '6402', label: '石嘴山市' },
      { code: '6403', label: '吴忠市' },
      { code: '6404', label: '固原市' },
      { code: '6405', label: '中卫市' }
    ]
  },
  {
    code: '65',
    label: '新疆维吾尔自治区',
    children: [
      { code: '6501', label: '乌鲁木齐市' },
      { code: '6502', label: '克拉玛依市' },
      { code: '6504', label: '吐鲁番市' },
      { code: '6505', label: '哈密市' },
      { code: '6523', label: '昌吉回族自治州' },
      { code: '6527', label: '博尔塔拉蒙古自治州' },
      { code: '6528', label: '巴音郭楞蒙古自治州' },
      { code: '6529', label: '阿克苏地区' },
      { code: '6530', label: '克孜勒苏柯尔克孜自治州' },
      { code: '6531', label: '喀什地区' },
      { code: '6532', label: '和田地区' },
      { code: '6540', label: '伊犁哈萨克自治州' },
      { code: '6542', label: '塔城地区' },
      { code: '6543', label: '阿勒泰地区' },
      { code: '659001', label: '石河子市' },
      { code: '659002', label: '阿拉尔市' },
      { code: '659003', label: '图木舒克市' },
      { code: '659004', label: '五家渠市' },
      { code: '659006', label: '铁门关市' }
    ]
  }
];
