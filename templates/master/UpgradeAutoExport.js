// Filenames must match across:
// aws-ai-qna-bot/templates/import/UpgradeAutoImport.js
// aws-ai-qna-bot/templates/master/UpgradeAutoExport.js
// and pattern in /aws-ai-qna-bot/lambda/import/index.js
var exportfile=`ExportAll_QnABot_v${process.env.npm_package_version}.json`;
var exportfile_metrics=`ExportAll_QnABot_v${process.env.npm_package_version}_metrics.json`;
var exportfile_feedback=`ExportAll_QnABot_v${process.env.npm_package_version}_feedback.json`;

module.exports={
    "PreUpgradeExport":{
        "Type": "Custom::PreUpgradeExport",
        "Properties": {
            ServiceToken: { "Fn::GetAtt" : ["CFNLambda", "Arn"] },
            bucket:{"Ref":"ExportBucket"},
            id:exportfile,
            index:{"Fn::Sub":"${Var.QnaIndex}"},
            encryption:{"Ref":"Encryption"},
            PRE_UPGRADE_EXPORT_TRIGGERS:{
                "Fn::Sub":[
                    "${EmbeddingsApi} ${EmbeddingsLambdaDimensions} ${EmbeddingsLambdaArn} ${SMEmbeddingEndpoint}",
                    {
                        "SMEmbeddingEndpoint": {
                            "Fn::If": [
                                "EmbeddingsSagemaker",
                                {"Fn::GetAtt": ["SagemakerEmbeddingsStack", "Outputs.EmbeddingsSagemakerEndpoint"] },
                                ""
                            ]
                          },
                    }
                ]
            }
        }
    },
    "PreUpgradeExportMetrics":{
        "Type": "Custom::PreUpgradeExport",
        "Properties": {
            ServiceToken: { "Fn::GetAtt" : ["CFNLambda", "Arn"] },
            bucket:{"Ref":"ExportBucket"},
            id:exportfile_metrics,
            index:{"Fn::Sub":"${Var.MetricsIndex}"},
            encryption:{"Ref":"Encryption"},
            PRE_UPGRADE_EXPORT_TRIGGERS:{
                "Fn::Sub":[
                    "${EmbeddingsApi} ${EmbeddingsLambdaDimensions} ${EmbeddingsLambdaArn} ${SMEmbeddingEndpoint}",
                    {
                        "SMEmbeddingEndpoint": {
                            "Fn::If": [
                                "EmbeddingsSagemaker",
                                {"Fn::GetAtt": ["SagemakerEmbeddingsStack", "Outputs.EmbeddingsSagemakerEndpoint"] },
                                ""
                            ]
                          },
                    }
                ]
            }
        }
    },
    "PreUpgradeExportFeedback":{
        "Type": "Custom::PreUpgradeExport",
        "Properties": {
            ServiceToken: { "Fn::GetAtt" : ["CFNLambda", "Arn"] },
            bucket:{"Ref":"ExportBucket"},
            id:exportfile_feedback,
            index:{"Fn::Sub":"${Var.FeedbackIndex}"},
            encryption:{"Ref":"Encryption"},
            PRE_UPGRADE_EXPORT_TRIGGERS:{
                "Fn::Sub":[
                    "${EmbeddingsApi} ${EmbeddingsLambdaDimensions} ${EmbeddingsLambdaArn} ${SMEmbeddingEndpoint}",
                    {
                        "SMEmbeddingEndpoint": {
                            "Fn::If": [
                                "EmbeddingsSagemaker",
                                {"Fn::GetAtt": ["SagemakerEmbeddingsStack", "Outputs.EmbeddingsSagemakerEndpoint"] },
                                ""
                            ]
                          },
                    }
                ]
            }
        }
    },
}


