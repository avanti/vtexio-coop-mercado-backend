# PBM Price API

Vtex backend app for apply external price table in client's cart through PBM business logic.

## **Request**
   
  `GET /instaleap/`

## **Body**
### Add PBM Product to Cart
  ```json
  {
   "orderFormId":"8a9efef8cb964e938c30a6d6105f3241",
   "orderFormItems": null,
   "pbmKey":"funcional",
   "preAuthConfig":{
			"companyFiscalNumber": "00285753000190",
			"benefitCardNumber": "84430190852",
			"products": [
				{
					"ean": "7897337704120",
					"price": 87.99,
					"quantity": 1
				}
			]
		}
}
  ```
### Change PBM Product Quantity
  ```json
  {
   "orderFormId":"8a9efef8cb964e938c30a6d6105f3241",
   "orderFormItems":[
      "12224",
      "10104"
],
   "pbmKey":"funcional",
   "preAuthConfig":{
			"companyFiscalNumber": "00285753000190",
			"benefitCardNumber": "84430190852",
			"products": [
				{
					"ean": "7897337704120",
					"price": 87.99,
					"quantity": 2
				}
			]
		}
}
  ```
  ---

* **Success Responses:**
  
  * **Code:** 200 OK  
    **Content:** 
  **Reason** Price and Quantity Approved by PBM API
```json
    {
      "Errors": [],
      "IsValid": true,
      "Message": null,
      "Transacao": {
        "Aprovada": true,
        "NumeroAutorizacao": 31280,
        "NumeroSequencial": 158232,
        "DataHora": "2020-10-16T13:38:42",
        "ValorTotal": 184.51,
        "ValorVista": 184.51,
        "ValorCartao": 0,
        "ValorTotalPMC": 263.58,
        "ValorTotalComReceita": 0,
        "ValorTotalSemReceita": 184.51,
        "ValorTotalDesconto": 79.07,
        "Itens": [
          {
            "TipoPrograma": 2,
            "EAN": "7897337706742",
            "Descricao": "JANUVIA   26358",
            "PrecoMaximoConsumidor": 263.58,
            "PrecoRecebido": 184.51,
            "PrecoFuncional": 184.51,
            "PrecoVenda": 184.51,
            "QuantidadeVenda": 1,
            "Receita": {
              "QuantidadeReceita": 0,
              "DataReceita": "2020-10-16T00:00:00",
              "Conselho": 0,
              "NumeroRegistroConselho": 0,
              "SiglaEstado": "00"
            },
            "Status": {
              "Aprovado": true,
              "Mensagem": null
            }
          }
        ],
        "CodigoPlano": null,
        "ObrigatorioUploadReceita": false
      }
    }
```
  * **Code:** 200 OK  
    **Content:**   
    **Reason** Price or Quantity not Approved by PBM API
    ```json
      {
          "Errors": [],
          "IsValid": true,
          "Message": null,
          "Transacao": {
            "Aprovada": false,
            "NumeroAutorizacao": 31474,
            "NumeroSequencial": 158426,
            "DataHora": "2020-10-19T17:29:49",
            "ValorTotal": 0,
            "ValorVista": 0,
            "ValorCartao": 0,
            "ValorTotalPMC": 0,
            "ValorTotalComReceita": 0,
            "ValorTotalSemReceita": 0,
            "ValorTotalDesconto": 0,
            "Itens": [
              {
                "TipoPrograma": 2,
                "EAN": "7897337704120",
                "Descricao": "EZETROL   17597",
                "PrecoMaximoConsumidor": 175.97,
                "PrecoRecebido": 87.99,
                "PrecoFuncional": 0,
                "PrecoVenda": 0,
                "QuantidadeVenda": 4,
                "Receita": {
                  "QuantidadeReceita": 0,
                  "DataReceita": "2020-10-19T00:00:00",
                  "Conselho": 0,
                  "NumeroRegistroConselho": 0,
                  "SiglaEstado": "00"
                },
                "Status": {
                  "Aprovado": false,
                  "Mensagem": "COMPRA EXCEDIDA DO PRODUTO. Contate a Funcional 0800 970 90 20"
                }
              }
            ],
            "CodigoPlano": null,
            "ObrigatorioUploadReceita": false
          }
      }
    ```  

* **Error Responses:**

    * **Code:** 400 Bad Request

    **Content:** 
    ```json
      {       
        "message": {
          "code": "CHK0025",
          "message": "Preço de item inválido",
          "exception": null
          }
      }
    ```  
    **Reason** Price has invalid characters

    ---

    **Content:** 
    ```json
      {
        "message": {
          "code": "1",
          "message": "Invalid cart id",
          "exception": null
        }
      }
    ```  
    **Reason** Invalid orderFormId

    ---

    **Content:** 
    ```json
    {
      "message": {
        "code": "1",
        "message": "Índice de item inválido",
        "exception": null
      }
    }
    ```  
    **Reason** Invalid orderForm.items[ index ]

    ---

    * **Code:** 403 Forbidden

    **Content:** 
    ```json
    {
        "message": "Not Allowed"
    }
    ```  
    **Reason** Invalid auth-token