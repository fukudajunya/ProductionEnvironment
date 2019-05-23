// LINEの認証を突破するために必要なお作法
var secret_token = "wcjACGH0MmZz3R+w6QRdciH3mgQ9VCyaISaHjQhn45E8dLasVSc/ChNvQD9ybNfjDL+urNzbFSWoXl81+gYpqpSy1flZDxWAXntIRxZuC8HP4QJA/+YE74U4vaZLybJisuSXHGbunD3yw3d+NBiG8QdB04t89/1O/w1cDnyilFU="
var secret = "Bearer " + secret_token;

function doPost(e) {
  var line = JSON.parse(e.postData.contents).events[0];
  var json = e.postData.getDataAsString();
  
  // LINEから送信されてきたデータから、リプライトークンを取得
  var token = JSON.parse(json).events[0].replyToken;
  
  // 送信されてきたデータのタイプを取得
  var type = JSON.parse(json).events[0].message.type;
  
  // メッセージ送信者のユーザーIDを取得する
  var userId = getUserID(line);
  
  //UserNameの取得
  var userName = getUserName(userId);
  
  // リプライを返すAPIのURI
  var url = "https://api.line.me/v2/bot/message/reply";
  
  // HTTPヘッダーの設定
  var headers = {
    "Content-Type" : "application/json",
    "Authorization":secret
  };
  
  // タイプがtextの場合、処理を行う
  if(type == "text"){
    var text = JSON.parse(json).events[0].message.text;
    switch(text){
      case "振込口座" :
        var data = returnMessage(token, "金融機関:三菱東京UFJ銀行\n支店名:八尾支店\n口座種別:普通\n口座番号:0199344\n口座名義:カンシャラ コウヅミナト");
        break;
      case "墾田永年私財法2019" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_manager
        };
        break;
      case "料金" :
        var data = returnMessage(token, "・能登よさこい参加費:￥24,000\n・鳴子/片方:￥1,300\n・鳴子/1組:￥2,500\n・衣装:￥22,000");
        break;
      case "申請状況確認" :
        var data = checkApplicationStatus(userId,token);
        break;
        // 管理者用メンバー申請状況確認
      case "メンバー申請状況" :
        var data = checkStatusForManager(token);
        break;  
      case "イベント連絡" :
        var data =  {
          "replyToken" : token, 
          "messages" : [ret_msg_inst]
        };
        break;
      case "行ってきます!" :
        var data = returnMessage(token, "行ってらっしゃい！");
        break;
      case "早く見たいなぁ" :
        var data = returnMessage(token, "もう少し待ってね！");
        break;
      case "キャンセル連絡" :
        // var data = returnMessage(token, "現在参加できるイベントはありません。")
        // さくよさ時期に復活
        var data =returnMessage(token, "サークルスクエアで不参加への更新をお願いします。\nhttps://www.c-sqr.net/cs75424/News.html\n\n能登について、4/12(金)以降のキャンセルの場合は、下記の二人にも連絡してね。\n\n■祭り担当:ふぁに\nhttps://line.me/ti/p/KKB-4EfFfs\n■インスト担当:まりな\nhttps://line.me/ti/p/VQJftJ59rh");
        break;
      case "サークルスクエア":
        var data = returnMessage(token, "イベント参加はサークルスクエアより参加表明をお願いします。\n\nhttps://www.c-sqr.net/cs75424/News.html");
        break;
      case "教えて担当さん":
        var data = returnMessage(token, "能登の担当は以下の2人です！相談はお二人へ！\n■祭り担当:ふぁに\nhttps://line.me/ti/p/KKB-4EfFfs\n■インスト担当:まりな\nhttps://line.me/ti/p/VQJftJ59rh");
        break;  
      case "振り動画" :
//        var data = returnMessage(token, "振り動画は制作中です！しばらく待ってね。");
        // 振り動画作成完了後復活
        
        var data =  {
        "replyToken" : token, 
        "messages" : [ret_msg_mv]
        };
        
        break;
        // 持ち物チェック
      case "持ち物チェック" :
        var data =  {
          "replyToken" : token, 
          "messages" : [ret_check]
        };
        break;
      case "購入申請" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_purchase
        };
        break;
      case "受け取り確認" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_receive
        };
        break;
      // さくよさ⇒能登に変更 by NF 5/9
      case "衣装の着方":
        var data = returnMessage(token, "準備中です！ちょっと待ってね！");
        break;
      case "能登よさこい参加費(a)" :
        var item = "能登よさこい参加費";
        var price = 24000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;  
      case "鳴子/1組(a)" :
        var item = "鳴子/1組";
        var price = 2500;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "鳴子/片方(a)" :
        var item = "鳴子/片方";
        var price = 1250;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;  
      case "衣装/S(a)" :
        var item = "衣装/S";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/M(a)" :
        var item = "衣装/M";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/L(a)" :
        var item = "衣装/L";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "衣装/LL(a)" :
        var item = "衣装/LL";
        var price = 22000;
        var data = purchaseApplicationInfo(userId,userName,item,price,token);
        break;
      case "支払い関連" :
        var data = {
          "replyToken" : token, 
          "messages" : quick_rep_payment
        };
        break;
　　　// 能登よさのため復活 by NF 5/9
      case "能登よさこい参加費(p)" :
        var item = "能登よさこい参加費";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;  
      case "鳴子/1組(p)" :
        var item = "鳴子/1組";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(p)" :
        var item = "鳴子/片方";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;  
      case "衣装/S(p)" :
        var item = "衣装/S";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/M(p)" :
        var item = "衣装/M";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/L(p)" :
        var item = "衣装/L";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      case "衣装/LL(p)" :
        var item = "衣装/LL";
        var data = paymentStatusInfo(userId,userName,item,token);
        break;
      // 能登よさのため復活 by NF 5/9
      case "能登よさこい参加費(r)" :
        var item = "能登よさこい参加費";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;  
      case "鳴子/1組(r)" :
        var item = "鳴子/1組";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "鳴子/片方(r)" :
        var item = "鳴子/片方";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;  
      case "衣装/S(r)" :
        var item = "衣装/S";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/M(r)" :
        var item = "衣装/M";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/L(r)" :
        var item = "衣装/L";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "衣装/LL(r)" :
        var item = "衣装/LL";
        var data = receivedStatusInfo(userId,userName,item,token);
        break;
      case "申請取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_purchase_cancel
        };
        break;
        // 能登よさのため復活 by NF 5/9
      case "能登よさこい参加費(ad)" :
        var item = "能登よさこい参加費";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;  
      case "鳴子/1組(ad)" :
        var item = "鳴子/1組";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "鳴子/片方(ad)" :
        var item = "鳴子/片方";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;  
      case "衣装/S(ad)" :
        var item = "衣装/S";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/M(ad)" :
        var item = "衣装/M";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/L(ad)" :
        var item = "衣装/L";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "衣装/LL(ad)" :
        var item = "衣装/LL";
        var data = cancelPurchaseApplication(userId,userName,item,token);
        break;
      case "支払い取消" :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep_cancel_payment
        };
        break;
      // 能登よさのため復活 by NF 5/9
      case "能登よさこい参加費(pd)" :
        var item = "能登よさこい参加費";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;  
      case "鳴子/1組(pd)" :
        var item = "鳴子/1組";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "鳴子/片方(pd)" :
        var item = "鳴子/片方";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;  
      case "衣装/S(pd)" :
        var item = "衣装/S";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/M(pd)" :
        var item = "衣装/M";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/L(pd)" :
        var item = "衣装/L";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      case "衣装/LL(pd)" :
        var item = "衣装/LL";
        var data = cancelPaymentStatus(userId,userName,item,token);
        break;
      default :
        var data = {
          "replyToken" : token,
          "messages" : quick_rep
        };
        break;
    }
  }else{
    var data = {
      "replyToken" : token,
      "messages" : quick_rep
    };
  };
  
  
  var options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(data)
  };
  
  return UrlFetchApp.fetch(url, options);  
}
