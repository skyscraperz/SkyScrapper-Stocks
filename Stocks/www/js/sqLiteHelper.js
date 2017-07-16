var sqliteHelper = function () {

    var Privileged = {

        objMyDB: null,

    }; //end of Privileged

    var External = {
        //Open or create new database
        OpenDB: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' }, function () {
                    //alert("Opened database ok");
                }, function (err) {
                    //alert('Open database ERROR: ' + JSON.stringify(err));
                });

            } catch (e) {
                //alert("Error -" + e.stack);
            }

        },

        CreateTblKeyValue: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("Create table if not exists keyValuePair (key text, value text);", [], function (res) {
                    // alert("Created table if not already present");
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }

        },

        CreateTblUserInfo: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("Create table if not exists UserInfo (key text, value text);", [], function (res) {
                    //alert("Created table if not already present");
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        CreateTblUsercredential: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("Create table if not exists Usercredential (key text, value text);", [], function (res) {
                    //alert("Created table if not already present");
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        CreateTblAuthorization: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("Create table if not exists TblAuthorization (key text, value text);", [], function (res) {
                    //alert("Created table if not already present");
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        CreateTblEquityOption: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("Create table if not exists TblEquityOption (key text, value text);", [], function (res) {
                    //alert("Created table if not already present");
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        EquityOption: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                //debugger;
                Privileged.objMyDB.executeSql("select key from TblEquityOption where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into TblEquityOption (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update TblEquityOption set value='" + value + "' where key = '" + key + "'", [], function (res) {
                            // alert("Updated " + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }
        },

        GetEquityOptionData: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from TblEquityOption where key='" + key + "'";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                        if (res.rows.length == 0) {
                            // alert("Onerror");
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        GetSymbolDetails: function (Symbol, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select * from CompanyDetails WHERE symbol='" + Symbol + "'";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        if (res.rows.length == 0) {
                            onError();
                        }
                        else {
                            var results = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                var Details = res.rows.item(i);
                                results.push(Details);
                            }
                            actResult = results;
                            //prompt('', JSON.stringify(actResult))
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        createTblCompanyDataDetails: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("CREATE TABLE IF NOT EXISTS CompanyDataDetails (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , underlying_symbol TEXT , symbol TEXT , type TEXT,strike TEXT ,expirationDate TEXT,volatility TEXT, theta TEXT,bid TEXT,bidSize TEXT,ask TEXT,askSize TEXT)", [], function (res) {
                    // alert("Created table if not already present");

                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        CreateTblCompanyDetails: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("CREATE TABLE IF NOT EXISTS CompanyDetails (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , symbol TEXT ,lastPrice TEXT, tradeTimestamp TEXT,netChange TEXT,percentChange TEXT, afterHour TEXT ,afterHourTimestamp TEXT)", [], function (res) {
                    // alert("Created table if not already present");
                    setTimeout(function () {
                        Privileged.objMyDB.executeSql("select * from CompanyDetails", [], function (res) {
                            if (res.rows.length == 0) {
                                Privileged.objMyDB.executeSql("INSERT INTO CompanyDetails (symbol,lastPrice,tradeTimestamp,netChange,percentChange,afterHour,afterHourTimestamp) VALUES (?,?,?,?,?,?,?) ", ["AAPL", '', '', '', '', '', ''], function (tx, res) {
                                })
                                Privileged.objMyDB.executeSql("INSERT INTO CompanyDetails (symbol,lastPrice,tradeTimestamp,netChange,percentChange,afterHour,afterHourTimestamp) VALUES (?,?,?,?,?,?,?) ", ["GOOGL", '', '', '', '', '', ''], function (tx, res) {
                                })
                                Privileged.objMyDB.executeSql("INSERT INTO CompanyDetails (symbol,lastPrice,tradeTimestamp,netChange,percentChange,afterHour,afterHourTimestamp) VALUES (?,?,?,?,?,?,?) ", ["AMZN", '', '', '', '', '', ''], function (tx, res) {
                                })
                            }
                            else {
                            }
                        }, 000);
                    })
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        InsertCompanyDetails: function (item) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                item = JSON.parse(item);
                angular.forEach(item, function (CompanyDetails) {
                    Privileged.objMyDB.executeSql("select * from CompanyDetails where symbol='" + CompanyDetails.t + "'", [], function (res) {
                        if (res.rows.length == 0) {
                            var query = "INSERT INTO CompanyDetails (symbol,lastPrice,tradeTimestamp,netChange,percentChange,afterHour,afterHourTimestamp) VALUES (?,?,?,?,?,?,?) ";
                            Privileged.objMyDB.executeSql(query, [CompanyDetails.t,
                                CompanyDetails.l,
                                CompanyDetails.ltt,
                                CompanyDetails.c,
                                CompanyDetails.cp,
                                CompanyDetails.cp,
                                CompanyDetails.cp,
                            ]);
                        }
                        else {

                            Privileged.objMyDB.executeSql("UPDATE CompanyDetails set lastPrice= '" + CompanyDetails.l
                                + "' , tradeTimestamp= '" + CompanyDetails.ltt
                                + "' , netChange= '" + CompanyDetails.c
                                + "' , percentChange= '" + CompanyDetails.cp
                                + "' , afterHour= '" + CompanyDetails.cp
                                + "' , afterHourTimestamp= '" + CompanyDetails.cp
                                + "'where symbol = '" + CompanyDetails.t + "'");
                        }
                    });
                });
            } catch (e) {
                alert(e)
            }
        },

        GetFromCompanyDetails: function (onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select * from CompanyDetails ORDER BY Id DESC";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        if (res.rows.length == 0) {
                            onError();
                        }
                        else {
                            var results = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                var CompanyDetails = res.rows.item(i);
                                results.push(CompanyDetails);
                            }
                            actResult = results;
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        UpdateHistoryData: function (onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                debugger;
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select underlying_symbol from CompanyDetails";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        if (res.rows.length == 0) {
                            onError();
                        }
                        else {
                            debugger;
                            var results = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                var CompanyDetails = res.rows.item(i);
                                results.push(CompanyDetails);
                            }
                            actResult = results;
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        ConcateSymbol: function (onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select group_concat(symbol, ',') as Result from CompanyDetails";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        if (res.rows.length == 0) {
                            onError();
                        }
                        else {
                            var company = res.rows.item(0);
                            actResult = company.Result;
                            if (actResult != null) {
                                onSuccess(actResult);
                            }
                            else {
                                onError();
                            }
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        DeleteSymbol: function (item, onSuccess, onError) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            var actResult = '';
            try {
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "DELETE FROM CompanyDetails WHERE symbol='" + item.symbol + "'";
                    //alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                    })
                })
            } catch (e) {
                //alert("Error - " + e.stack);
            }
        },

        SaveGoogleUserProfile: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                //debugger;
                Privileged.objMyDB.executeSql("select key from UserInfo where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into UserInfo (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update UserInfo set value='" + value + "' where key = '" + key + "'", [], function (res) {
                            // alert("Updated " + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }
        },

        CreateTblHistoryData: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("Create table if not exists TblHistoryData (key text, value text);", [], function (res) {
                    //alert("Created table if not already present");
                });
            } catch (e) {
                //alert("error - CreateTblKeyValue : " + e.stack)
            }
        },

        HistoryData: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                //debugger;
                Privileged.objMyDB.executeSql("select key from TblHistoryData where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into TblHistoryData (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update TblHistoryData set value='" + value + "' where key = '" + key + "'", [], function (res) {
                            // alert("Updated " + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }
        },

        GetOneDayHistory: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from TblHistoryData where key='" + key + "'";
                    tx.executeSql(query, [], function (tx, res) {
                        if (res.rows.length == 0) {
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        GetHistoryData: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            //debugger;
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from TblHistoryData where key='" + key + "'";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                        if (res.rows.length == 0) {
                            // alert("Onerror");
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        GetGoogleUserProfile: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from UserInfo where key='" + key + "'";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                        if (res.rows.length == 0) {
                            // alert("Onerror");
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        InsertAuthorizationData: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("select key from TblAuthorization where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into TblAuthorization (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update TblAuthorization set value='" + value + "' where key = '" + key + "'", [], function (res) {
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }

        },

        GetFromTblAuthorization: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            var actResult = '';
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from TblAuthorization where key='" + key + "'";
                    // alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                        if (res.rows.length == 0) {
                            // alert("Onerror");
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        InsertUserEmail: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {

                Privileged.objMyDB.executeSql("select key from UserInfo where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into UserInfo (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update UserInfo set value='" + value + "' where key = '" + key + "'", [], function (res) {
                            // alert("Updated " + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }

        },

        InsertPassWord: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {

                Privileged.objMyDB.executeSql("select key from UserInfo where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into UserInfo (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update UserInfo set value='" + value + "' where key = '" + key + "'", [], function (res) {
                            // alert("Updated " + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }

        },

        InsertPin: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {

                Privileged.objMyDB.executeSql("select key from UserInfo where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into UserInfo (key,value) values ('" + key + "','" + value + "')", [], function (res) {
                            //alert("Added" + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update UserInfo set value='" + value + "' where key = '" + key + "'", [], function (res) {
                            // alert("Updated " + key + " to keyValuePair database");
                            //alert(value);
                            //alert(JSON.stringify(value));
                        });
                    }
                });
            } catch (e) {
                // alert("error - Insert : " + e.stack)
            }

        },

        InsertUsersinfo: function (key, value) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            try {
                Privileged.objMyDB.executeSql("select key from UserInfo where key='" + key + "'", [], function (res) {
                    if (res.rows.length == 0) {
                        //alert("Key not present, inserting row");
                        Privileged.objMyDB.executeSql("insert into UserInfo (key,value) values ('" + key + "','" + JSON.stringify(value) + "')", [], function (res) {
                            //window.prompt("Save 2 Sqlite - ", JSON.stringify(value))
                            //alert("Added" + key + " to UserInfo database");
                            //alert(value);
                        });
                    }
                    else {
                        Privileged.objMyDB.executeSql("update UserInfo set value='" + JSON.stringify(value) + "' where key = '" + key + "'", [], function (res) {
                            //alert("Updated " + key + " to UserInfo database");
                            // alert(value);
                        });
                    }
                });
            } catch (e) {
                //alert("error - Insert : " + e.stack)
            }

        },

        GetFromKeyvaluePair: function (key, OnValueFound, OnNotFound) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            var actResult = '';
            try {

                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from keyValuePair where key='" + key + "'";
                    // alert(query);
                    tx.executeSql(query, [], function (tx, res) {
                        if (res.rows.length == 0) {
                            //alert("No matching key found");
                            OnNotFound();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actresult ' + actResult);
                            OnValueFound(actResult)

                        }
                    });
                })
            } catch (e) {
                //alert("Error - Get :" + e.stack);
                return actResult;
            }
        },

        GetFromUserInfo: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');
            //alert("1")
            var actResult = '';
            //alert("2")
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from UserInfo where key='" + key + "'";
                    //alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);

                        if (res.rows.length == 0) {
                            // alert("Onerror");
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }

                    });
                })
            } catch (e) {
                //alert("3")
                onError();
                //alert("Error - Get :" + e.stack);
                //return actResult;
            }
        },

        FetchFromUserInfo: function () {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            // Execute SELECT statement to load message from database.
            var actResult = '';
            try {
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select * from UserInfo ";
                    tx.executeSql(query, [], function (tx, res) {
                        // alert('Rows Length - ' + res.rows.length);
                        if (res.rows.length == 0) {
                            // alert("Onerror");
                            onError();
                        }
                        else {
                            var results = [];

                            for (var i = 0; i < res.rows.length; i++) {
                                var str = +res.rows.item(i).key + ":" + res.rows.item(i).value;
                                results.push(str);
                            }
                            actResult = results;
                            prompt('', JSON.stringify(actResult))
                            if (actResult != null)
                                onSuccess(actResult);
                        }
                    });
                })
            } catch (e) {
                onError();
            }
        },

        GetFromTblUsercredential: function (key, onSuccess, onError) {
            //alert('GetFromUserInfo calling...');

            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            //alert("1")
            var actResult = '';
            //alert("2")
            try {
                //this.OpenDB();
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "select value from Usercredential where key='" + key + "'";
                    //alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                        if (res.rows.length == 0) {
                            //   alert("Onerror");
                            onError();
                        }
                        else {
                            actResult = res.rows.item(0).value;
                            //alert('actResult - ' + actResult);
                            if (actResult != null)
                                onSuccess(actResult);
                        }

                    });
                })
            } catch (e) {
                //alert("3")
                onError();
                //alert("Error - Get :" + e.stack);
                //return actResult;
            }
        },

        DeletefromUsercredential: function (key, onSuccess, onError) {
            Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
            var actResult = '';
            try {
                Privileged.objMyDB.transaction(function (tx) {
                    var query = "DELETE FROM Usercredential WHERE key='" + key + "'";
                    //alert('query - ' + query);
                    tx.executeSql(query, [], function (tx, res) {
                        //alert('Rows Length - ' + res.rows.length);
                    })
                })
            } catch (e) {
                //alert("Error - " + e.stack);
            }
        },

        Delete: function (isDeleteKeyTable) {
            try {
                Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })

                if (isDeleteKeyTable) {
                    Privileged.objMyDB.transaction(function (tx) {
                        //alert("Delete KeyTable")
                        tx.executeSql('DROP TABLE IF EXISTS TblHistoryData');

                    })
                }
                Privileged.objMyDB.transaction(function (tx) {
                    // alert("Delete Test")
                    tx.executeSql('DROP TABLE IF EXISTS TblHistoryData');

                })
            } catch (e) {
                //alert("Error - " + e.stack);
            }
        },

        DeleteTblHistoryData: function () {
            try {
                Privileged.objMyDB = window.sqlitePlugin.openDatabase({ name: "sql.db", location: 'default' })
                Privileged.objMyDB.transaction(function (tx) {
                    // alert("Delete Test")
                    tx.executeSql('DROP TABLE IF EXISTS TblHistoryData');
                })
            } catch (e) {
                //alert("Error - " + e.stack);
            }
        }

    }; //end of External

    return External;

}();
