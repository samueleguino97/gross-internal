package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/kolo/xmlrpc"
)

var (
	url      = "https://grosscafe.cloudpepper.site/"
	db       = "grosscafe.cloudpepper.site"
	username = "admin"
	password = "370649f740d18ffe470811c1bc2ae75278beb29c"
)

func Handler(w http.ResponseWriter, r *http.Request) {

	client, err := xmlrpc.NewClient(fmt.Sprintf("%s/xmlrpc/2/common", url), nil)
	if err != nil {
		log.Fatal(err)
	}
	common := map[string]any{}
	if err := client.Call("version", nil, &common); err != nil {
		log.Fatal(err)
	}
	var uid int64
	if err := client.Call("authenticate", []any{
		db, username, password,
		map[string]any{},
	}, &uid); err != nil {
		log.Fatal(err)
	}
	models, err := xmlrpc.NewClient(fmt.Sprintf("%s/xmlrpc/2/object", url), nil)
	if err != nil {
		log.Fatal(err)
	}
	var result bool
	if err := models.Call("execute_kw", []any{
		db, uid, password,
		"res.partner", "check_access_rights",
		[]string{"read"},
		map[string]bool{"raise_exception": false},
	}, &result); err != nil {
		log.Fatal(err)
	}
	var ids []any
	if err := models.Call("execute_kw", []any{
		db, uid, password,
		"product.template", "search_read",
		[]any{[]any{
			[]any{"available_in_pos", "=", true},
		}},
	}, &ids); err != nil {
		log.Fatal(err)
	}
	//  fmt.Println(ids)

	jsonString, err := json.Marshal(ids)
	if err != nil {

		log.Fatal(err)
	}
	fmt.Fprintf(w, "%v", string(jsonString))
}
