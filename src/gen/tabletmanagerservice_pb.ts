//
//Copyright 2019 The Vitess Authors.
//
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//
//http://www.apache.org/licenses/LICENSE-2.0
//
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

// This file contains the service definition for making management API
// calls to VtTablet.

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,json_types=true"
// @generated from file tabletmanagerservice.proto (package tabletmanagerservice, syntax proto3)
/* eslint-disable */

import type { GenFile, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { ApplySchemaRequestSchema, ApplySchemaResponseSchema, BackupRequestSchema, BackupResponseSchema, ChangeTagsRequestSchema, ChangeTagsResponseSchema, ChangeTypeRequestSchema, ChangeTypeResponseSchema, CheckThrottlerRequestSchema, CheckThrottlerResponseSchema, ConcludeTransactionRequestSchema, ConcludeTransactionResponseSchema, CreateVReplicationWorkflowRequestSchema, CreateVReplicationWorkflowResponseSchema, DeleteVReplicationWorkflowRequestSchema, DeleteVReplicationWorkflowResponseSchema, DemotePrimaryRequestSchema, DemotePrimaryResponseSchema, ExecuteFetchAsAllPrivsRequestSchema, ExecuteFetchAsAllPrivsResponseSchema, ExecuteFetchAsAppRequestSchema, ExecuteFetchAsAppResponseSchema, ExecuteFetchAsDbaRequestSchema, ExecuteFetchAsDbaResponseSchema, ExecuteHookRequestSchema, ExecuteHookResponseSchema, ExecuteMultiFetchAsDbaRequestSchema, ExecuteMultiFetchAsDbaResponseSchema, ExecuteQueryRequestSchema, ExecuteQueryResponseSchema, FullStatusRequestSchema, FullStatusResponseSchema, GetGlobalStatusVarsRequestSchema, GetGlobalStatusVarsResponseSchema, GetPermissionsRequestSchema, GetPermissionsResponseSchema, GetReplicasRequestSchema, GetReplicasResponseSchema, GetSchemaRequestSchema, GetSchemaResponseSchema, GetThrottlerStatusRequestSchema, GetThrottlerStatusResponseSchema, GetUnresolvedTransactionsRequestSchema, GetUnresolvedTransactionsResponseSchema, HasVReplicationWorkflowsRequestSchema, HasVReplicationWorkflowsResponseSchema, InitPrimaryRequestSchema, InitPrimaryResponseSchema, InitReplicaRequestSchema, InitReplicaResponseSchema, LockTablesRequestSchema, LockTablesResponseSchema, MysqlHostMetricsRequestSchema, MysqlHostMetricsResponseSchema, PingRequestSchema, PingResponseSchema, PopulateReparentJournalRequestSchema, PopulateReparentJournalResponseSchema, PreflightSchemaRequestSchema, PreflightSchemaResponseSchema, PrimaryPositionRequestSchema, PrimaryPositionResponseSchema, PrimaryStatusRequestSchema, PrimaryStatusResponseSchema, PromoteReplicaRequestSchema, PromoteReplicaResponseSchema, ReadReparentJournalInfoRequestSchema, ReadReparentJournalInfoResponseSchema, ReadTransactionRequestSchema, ReadTransactionResponseSchema, ReadVReplicationWorkflowRequestSchema, ReadVReplicationWorkflowResponseSchema, ReadVReplicationWorkflowsRequestSchema, ReadVReplicationWorkflowsResponseSchema, RefreshStateRequestSchema, RefreshStateResponseSchema, ReloadSchemaRequestSchema, ReloadSchemaResponseSchema, ReplicationStatusRequestSchema, ReplicationStatusResponseSchema, ReplicaWasPromotedRequestSchema, ReplicaWasPromotedResponseSchema, ReplicaWasRestartedRequestSchema, ReplicaWasRestartedResponseSchema, ResetReplicationParametersRequestSchema, ResetReplicationParametersResponseSchema, ResetReplicationRequestSchema, ResetReplicationResponseSchema, ResetSequencesRequestSchema, ResetSequencesResponseSchema, RestoreFromBackupRequestSchema, RestoreFromBackupResponseSchema, RunHealthCheckRequestSchema, RunHealthCheckResponseSchema, SetReadOnlyRequestSchema, SetReadOnlyResponseSchema, SetReadWriteRequestSchema, SetReadWriteResponseSchema, SetReplicationSourceRequestSchema, SetReplicationSourceResponseSchema, SleepRequestSchema, SleepResponseSchema, StartReplicationRequestSchema, StartReplicationResponseSchema, StartReplicationUntilAfterRequestSchema, StartReplicationUntilAfterResponseSchema, StopReplicationAndGetStatusRequestSchema, StopReplicationAndGetStatusResponseSchema, StopReplicationMinimumRequestSchema, StopReplicationMinimumResponseSchema, StopReplicationRequestSchema, StopReplicationResponseSchema, UndoDemotePrimaryRequestSchema, UndoDemotePrimaryResponseSchema, UnlockTablesRequestSchema, UnlockTablesResponseSchema, UpdateVReplicationWorkflowRequestSchema, UpdateVReplicationWorkflowResponseSchema, UpdateVReplicationWorkflowsRequestSchema, UpdateVReplicationWorkflowsResponseSchema, ValidateVReplicationPermissionsRequestSchema, ValidateVReplicationPermissionsResponseSchema, VDiffRequestSchema, VDiffResponseSchema, VReplicationExecRequestSchema, VReplicationExecResponseSchema, VReplicationWaitForPosRequestSchema, VReplicationWaitForPosResponseSchema, WaitForPositionRequestSchema, WaitForPositionResponseSchema } from "./tabletmanagerdata_pb";
import { file_tabletmanagerdata } from "./tabletmanagerdata_pb";

/**
 * Describes the file tabletmanagerservice.proto.
 */
export const file_tabletmanagerservice: GenFile = /*@__PURE__*/
  fileDesc("Chp0YWJsZXRtYW5hZ2Vyc2VydmljZS5wcm90bxIUdGFibGV0bWFuYWdlcnNlcnZpY2UyuTkKDVRhYmxldE1hbmFnZXISSQoEUGluZxIeLnRhYmxldG1hbmFnZXJkYXRhLlBpbmdSZXF1ZXN0Gh8udGFibGV0bWFuYWdlcmRhdGEuUGluZ1Jlc3BvbnNlIgASTAoFU2xlZXASHy50YWJsZXRtYW5hZ2VyZGF0YS5TbGVlcFJlcXVlc3QaIC50YWJsZXRtYW5hZ2VyZGF0YS5TbGVlcFJlc3BvbnNlIgASXgoLRXhlY3V0ZUhvb2sSJS50YWJsZXRtYW5hZ2VyZGF0YS5FeGVjdXRlSG9va1JlcXVlc3QaJi50YWJsZXRtYW5hZ2VyZGF0YS5FeGVjdXRlSG9va1Jlc3BvbnNlIgASWAoJR2V0U2NoZW1hEiMudGFibGV0bWFuYWdlcmRhdGEuR2V0U2NoZW1hUmVxdWVzdBokLnRhYmxldG1hbmFnZXJkYXRhLkdldFNjaGVtYVJlc3BvbnNlIgASZwoOR2V0UGVybWlzc2lvbnMSKC50YWJsZXRtYW5hZ2VyZGF0YS5HZXRQZXJtaXNzaW9uc1JlcXVlc3QaKS50YWJsZXRtYW5hZ2VyZGF0YS5HZXRQZXJtaXNzaW9uc1Jlc3BvbnNlIgASdgoTR2V0R2xvYmFsU3RhdHVzVmFycxItLnRhYmxldG1hbmFnZXJkYXRhLkdldEdsb2JhbFN0YXR1c1ZhcnNSZXF1ZXN0Gi4udGFibGV0bWFuYWdlcmRhdGEuR2V0R2xvYmFsU3RhdHVzVmFyc1Jlc3BvbnNlIgASXgoLU2V0UmVhZE9ubHkSJS50YWJsZXRtYW5hZ2VyZGF0YS5TZXRSZWFkT25seVJlcXVlc3QaJi50YWJsZXRtYW5hZ2VyZGF0YS5TZXRSZWFkT25seVJlc3BvbnNlIgASYQoMU2V0UmVhZFdyaXRlEiYudGFibGV0bWFuYWdlcmRhdGEuU2V0UmVhZFdyaXRlUmVxdWVzdBonLnRhYmxldG1hbmFnZXJkYXRhLlNldFJlYWRXcml0ZVJlc3BvbnNlIgASWwoKQ2hhbmdlVGFncxIkLnRhYmxldG1hbmFnZXJkYXRhLkNoYW5nZVRhZ3NSZXF1ZXN0GiUudGFibGV0bWFuYWdlcmRhdGEuQ2hhbmdlVGFnc1Jlc3BvbnNlIgASWwoKQ2hhbmdlVHlwZRIkLnRhYmxldG1hbmFnZXJkYXRhLkNoYW5nZVR5cGVSZXF1ZXN0GiUudGFibGV0bWFuYWdlcmRhdGEuQ2hhbmdlVHlwZVJlc3BvbnNlIgASYQoMUmVmcmVzaFN0YXRlEiYudGFibGV0bWFuYWdlcmRhdGEuUmVmcmVzaFN0YXRlUmVxdWVzdBonLnRhYmxldG1hbmFnZXJkYXRhLlJlZnJlc2hTdGF0ZVJlc3BvbnNlIgASZwoOUnVuSGVhbHRoQ2hlY2sSKC50YWJsZXRtYW5hZ2VyZGF0YS5SdW5IZWFsdGhDaGVja1JlcXVlc3QaKS50YWJsZXRtYW5hZ2VyZGF0YS5SdW5IZWFsdGhDaGVja1Jlc3BvbnNlIgASYQoMUmVsb2FkU2NoZW1hEiYudGFibGV0bWFuYWdlcmRhdGEuUmVsb2FkU2NoZW1hUmVxdWVzdBonLnRhYmxldG1hbmFnZXJkYXRhLlJlbG9hZFNjaGVtYVJlc3BvbnNlIgASagoPUHJlZmxpZ2h0U2NoZW1hEikudGFibGV0bWFuYWdlcmRhdGEuUHJlZmxpZ2h0U2NoZW1hUmVxdWVzdBoqLnRhYmxldG1hbmFnZXJkYXRhLlByZWZsaWdodFNjaGVtYVJlc3BvbnNlIgASXgoLQXBwbHlTY2hlbWESJS50YWJsZXRtYW5hZ2VyZGF0YS5BcHBseVNjaGVtYVJlcXVlc3QaJi50YWJsZXRtYW5hZ2VyZGF0YS5BcHBseVNjaGVtYVJlc3BvbnNlIgASZwoOUmVzZXRTZXF1ZW5jZXMSKC50YWJsZXRtYW5hZ2VyZGF0YS5SZXNldFNlcXVlbmNlc1JlcXVlc3QaKS50YWJsZXRtYW5hZ2VyZGF0YS5SZXNldFNlcXVlbmNlc1Jlc3BvbnNlIgASWwoKTG9ja1RhYmxlcxIkLnRhYmxldG1hbmFnZXJkYXRhLkxvY2tUYWJsZXNSZXF1ZXN0GiUudGFibGV0bWFuYWdlcmRhdGEuTG9ja1RhYmxlc1Jlc3BvbnNlIgASYQoMVW5sb2NrVGFibGVzEiYudGFibGV0bWFuYWdlcmRhdGEuVW5sb2NrVGFibGVzUmVxdWVzdBonLnRhYmxldG1hbmFnZXJkYXRhLlVubG9ja1RhYmxlc1Jlc3BvbnNlIgASYQoMRXhlY3V0ZVF1ZXJ5EiYudGFibGV0bWFuYWdlcmRhdGEuRXhlY3V0ZVF1ZXJ5UmVxdWVzdBonLnRhYmxldG1hbmFnZXJkYXRhLkV4ZWN1dGVRdWVyeVJlc3BvbnNlIgAScAoRRXhlY3V0ZUZldGNoQXNEYmESKy50YWJsZXRtYW5hZ2VyZGF0YS5FeGVjdXRlRmV0Y2hBc0RiYVJlcXVlc3QaLC50YWJsZXRtYW5hZ2VyZGF0YS5FeGVjdXRlRmV0Y2hBc0RiYVJlc3BvbnNlIgASfwoWRXhlY3V0ZU11bHRpRmV0Y2hBc0RiYRIwLnRhYmxldG1hbmFnZXJkYXRhLkV4ZWN1dGVNdWx0aUZldGNoQXNEYmFSZXF1ZXN0GjEudGFibGV0bWFuYWdlcmRhdGEuRXhlY3V0ZU11bHRpRmV0Y2hBc0RiYVJlc3BvbnNlIgASfwoWRXhlY3V0ZUZldGNoQXNBbGxQcml2cxIwLnRhYmxldG1hbmFnZXJkYXRhLkV4ZWN1dGVGZXRjaEFzQWxsUHJpdnNSZXF1ZXN0GjEudGFibGV0bWFuYWdlcmRhdGEuRXhlY3V0ZUZldGNoQXNBbGxQcml2c1Jlc3BvbnNlIgAScAoRRXhlY3V0ZUZldGNoQXNBcHASKy50YWJsZXRtYW5hZ2VyZGF0YS5FeGVjdXRlRmV0Y2hBc0FwcFJlcXVlc3QaLC50YWJsZXRtYW5hZ2VyZGF0YS5FeGVjdXRlRmV0Y2hBc0FwcFJlc3BvbnNlIgASiAEKGUdldFVucmVzb2x2ZWRUcmFuc2FjdGlvbnMSMy50YWJsZXRtYW5hZ2VyZGF0YS5HZXRVbnJlc29sdmVkVHJhbnNhY3Rpb25zUmVxdWVzdBo0LnRhYmxldG1hbmFnZXJkYXRhLkdldFVucmVzb2x2ZWRUcmFuc2FjdGlvbnNSZXNwb25zZSIAEmoKD1JlYWRUcmFuc2FjdGlvbhIpLnRhYmxldG1hbmFnZXJkYXRhLlJlYWRUcmFuc2FjdGlvblJlcXVlc3QaKi50YWJsZXRtYW5hZ2VyZGF0YS5SZWFkVHJhbnNhY3Rpb25SZXNwb25zZSIAEnYKE0NvbmNsdWRlVHJhbnNhY3Rpb24SLS50YWJsZXRtYW5hZ2VyZGF0YS5Db25jbHVkZVRyYW5zYWN0aW9uUmVxdWVzdBouLnRhYmxldG1hbmFnZXJkYXRhLkNvbmNsdWRlVHJhbnNhY3Rpb25SZXNwb25zZSIAEm0KEE15c3FsSG9zdE1ldHJpY3MSKi50YWJsZXRtYW5hZ2VyZGF0YS5NeXNxbEhvc3RNZXRyaWNzUmVxdWVzdBorLnRhYmxldG1hbmFnZXJkYXRhLk15c3FsSG9zdE1ldHJpY3NSZXNwb25zZSIAEnAKEVJlcGxpY2F0aW9uU3RhdHVzEisudGFibGV0bWFuYWdlcmRhdGEuUmVwbGljYXRpb25TdGF0dXNSZXF1ZXN0GiwudGFibGV0bWFuYWdlcmRhdGEuUmVwbGljYXRpb25TdGF0dXNSZXNwb25zZSIAEmQKDVByaW1hcnlTdGF0dXMSJy50YWJsZXRtYW5hZ2VyZGF0YS5QcmltYXJ5U3RhdHVzUmVxdWVzdBooLnRhYmxldG1hbmFnZXJkYXRhLlByaW1hcnlTdGF0dXNSZXNwb25zZSIAEmoKD1ByaW1hcnlQb3NpdGlvbhIpLnRhYmxldG1hbmFnZXJkYXRhLlByaW1hcnlQb3NpdGlvblJlcXVlc3QaKi50YWJsZXRtYW5hZ2VyZGF0YS5QcmltYXJ5UG9zaXRpb25SZXNwb25zZSIAEmoKD1dhaXRGb3JQb3NpdGlvbhIpLnRhYmxldG1hbmFnZXJkYXRhLldhaXRGb3JQb3NpdGlvblJlcXVlc3QaKi50YWJsZXRtYW5hZ2VyZGF0YS5XYWl0Rm9yUG9zaXRpb25SZXNwb25zZSIAEmoKD1N0b3BSZXBsaWNhdGlvbhIpLnRhYmxldG1hbmFnZXJkYXRhLlN0b3BSZXBsaWNhdGlvblJlcXVlc3QaKi50YWJsZXRtYW5hZ2VyZGF0YS5TdG9wUmVwbGljYXRpb25SZXNwb25zZSIAEn8KFlN0b3BSZXBsaWNhdGlvbk1pbmltdW0SMC50YWJsZXRtYW5hZ2VyZGF0YS5TdG9wUmVwbGljYXRpb25NaW5pbXVtUmVxdWVzdBoxLnRhYmxldG1hbmFnZXJkYXRhLlN0b3BSZXBsaWNhdGlvbk1pbmltdW1SZXNwb25zZSIAEm0KEFN0YXJ0UmVwbGljYXRpb24SKi50YWJsZXRtYW5hZ2VyZGF0YS5TdGFydFJlcGxpY2F0aW9uUmVxdWVzdBorLnRhYmxldG1hbmFnZXJkYXRhLlN0YXJ0UmVwbGljYXRpb25SZXNwb25zZSIAEosBChpTdGFydFJlcGxpY2F0aW9uVW50aWxBZnRlchI0LnRhYmxldG1hbmFnZXJkYXRhLlN0YXJ0UmVwbGljYXRpb25VbnRpbEFmdGVyUmVxdWVzdBo1LnRhYmxldG1hbmFnZXJkYXRhLlN0YXJ0UmVwbGljYXRpb25VbnRpbEFmdGVyUmVzcG9uc2UiABJeCgtHZXRSZXBsaWNhcxIlLnRhYmxldG1hbmFnZXJkYXRhLkdldFJlcGxpY2FzUmVxdWVzdBomLnRhYmxldG1hbmFnZXJkYXRhLkdldFJlcGxpY2FzUmVzcG9uc2UiABKLAQoaQ3JlYXRlVlJlcGxpY2F0aW9uV29ya2Zsb3cSNC50YWJsZXRtYW5hZ2VyZGF0YS5DcmVhdGVWUmVwbGljYXRpb25Xb3JrZmxvd1JlcXVlc3QaNS50YWJsZXRtYW5hZ2VyZGF0YS5DcmVhdGVWUmVwbGljYXRpb25Xb3JrZmxvd1Jlc3BvbnNlIgASiwEKGkRlbGV0ZVZSZXBsaWNhdGlvbldvcmtmbG93EjQudGFibGV0bWFuYWdlcmRhdGEuRGVsZXRlVlJlcGxpY2F0aW9uV29ya2Zsb3dSZXF1ZXN0GjUudGFibGV0bWFuYWdlcmRhdGEuRGVsZXRlVlJlcGxpY2F0aW9uV29ya2Zsb3dSZXNwb25zZSIAEoUBChhIYXNWUmVwbGljYXRpb25Xb3JrZmxvd3MSMi50YWJsZXRtYW5hZ2VyZGF0YS5IYXNWUmVwbGljYXRpb25Xb3JrZmxvd3NSZXF1ZXN0GjMudGFibGV0bWFuYWdlcmRhdGEuSGFzVlJlcGxpY2F0aW9uV29ya2Zsb3dzUmVzcG9uc2UiABKFAQoYUmVhZFZSZXBsaWNhdGlvbldvcmtmbG93EjIudGFibGV0bWFuYWdlcmRhdGEuUmVhZFZSZXBsaWNhdGlvbldvcmtmbG93UmVxdWVzdBozLnRhYmxldG1hbmFnZXJkYXRhLlJlYWRWUmVwbGljYXRpb25Xb3JrZmxvd1Jlc3BvbnNlIgASiAEKGVJlYWRWUmVwbGljYXRpb25Xb3JrZmxvd3MSMy50YWJsZXRtYW5hZ2VyZGF0YS5SZWFkVlJlcGxpY2F0aW9uV29ya2Zsb3dzUmVxdWVzdBo0LnRhYmxldG1hbmFnZXJkYXRhLlJlYWRWUmVwbGljYXRpb25Xb3JrZmxvd3NSZXNwb25zZSIAEosBChpVcGRhdGVWUmVwbGljYXRpb25Xb3JrZmxvdxI0LnRhYmxldG1hbmFnZXJkYXRhLlVwZGF0ZVZSZXBsaWNhdGlvbldvcmtmbG93UmVxdWVzdBo1LnRhYmxldG1hbmFnZXJkYXRhLlVwZGF0ZVZSZXBsaWNhdGlvbldvcmtmbG93UmVzcG9uc2UiABKOAQobVXBkYXRlVlJlcGxpY2F0aW9uV29ya2Zsb3dzEjUudGFibGV0bWFuYWdlcmRhdGEuVXBkYXRlVlJlcGxpY2F0aW9uV29ya2Zsb3dzUmVxdWVzdBo2LnRhYmxldG1hbmFnZXJkYXRhLlVwZGF0ZVZSZXBsaWNhdGlvbldvcmtmbG93c1Jlc3BvbnNlIgASmgEKH1ZhbGlkYXRlVlJlcGxpY2F0aW9uUGVybWlzc2lvbnMSOS50YWJsZXRtYW5hZ2VyZGF0YS5WYWxpZGF0ZVZSZXBsaWNhdGlvblBlcm1pc3Npb25zUmVxdWVzdBo6LnRhYmxldG1hbmFnZXJkYXRhLlZhbGlkYXRlVlJlcGxpY2F0aW9uUGVybWlzc2lvbnNSZXNwb25zZSIAEm0KEFZSZXBsaWNhdGlvbkV4ZWMSKi50YWJsZXRtYW5hZ2VyZGF0YS5WUmVwbGljYXRpb25FeGVjUmVxdWVzdBorLnRhYmxldG1hbmFnZXJkYXRhLlZSZXBsaWNhdGlvbkV4ZWNSZXNwb25zZSIAEn8KFlZSZXBsaWNhdGlvbldhaXRGb3JQb3MSMC50YWJsZXRtYW5hZ2VyZGF0YS5WUmVwbGljYXRpb25XYWl0Rm9yUG9zUmVxdWVzdBoxLnRhYmxldG1hbmFnZXJkYXRhLlZSZXBsaWNhdGlvbldhaXRGb3JQb3NSZXNwb25zZSIAEkwKBVZEaWZmEh8udGFibGV0bWFuYWdlcmRhdGEuVkRpZmZSZXF1ZXN0GiAudGFibGV0bWFuYWdlcmRhdGEuVkRpZmZSZXNwb25zZSIAEm0KEFJlc2V0UmVwbGljYXRpb24SKi50YWJsZXRtYW5hZ2VyZGF0YS5SZXNldFJlcGxpY2F0aW9uUmVxdWVzdBorLnRhYmxldG1hbmFnZXJkYXRhLlJlc2V0UmVwbGljYXRpb25SZXNwb25zZSIAEl4KC0luaXRQcmltYXJ5EiUudGFibGV0bWFuYWdlcmRhdGEuSW5pdFByaW1hcnlSZXF1ZXN0GiYudGFibGV0bWFuYWdlcmRhdGEuSW5pdFByaW1hcnlSZXNwb25zZSIAEoIBChdQb3B1bGF0ZVJlcGFyZW50Sm91cm5hbBIxLnRhYmxldG1hbmFnZXJkYXRhLlBvcHVsYXRlUmVwYXJlbnRKb3VybmFsUmVxdWVzdBoyLnRhYmxldG1hbmFnZXJkYXRhLlBvcHVsYXRlUmVwYXJlbnRKb3VybmFsUmVzcG9uc2UiABKCAQoXUmVhZFJlcGFyZW50Sm91cm5hbEluZm8SMS50YWJsZXRtYW5hZ2VyZGF0YS5SZWFkUmVwYXJlbnRKb3VybmFsSW5mb1JlcXVlc3QaMi50YWJsZXRtYW5hZ2VyZGF0YS5SZWFkUmVwYXJlbnRKb3VybmFsSW5mb1Jlc3BvbnNlIgASXgoLSW5pdFJlcGxpY2ESJS50YWJsZXRtYW5hZ2VyZGF0YS5Jbml0UmVwbGljYVJlcXVlc3QaJi50YWJsZXRtYW5hZ2VyZGF0YS5Jbml0UmVwbGljYVJlc3BvbnNlIgASZAoNRGVtb3RlUHJpbWFyeRInLnRhYmxldG1hbmFnZXJkYXRhLkRlbW90ZVByaW1hcnlSZXF1ZXN0GigudGFibGV0bWFuYWdlcmRhdGEuRGVtb3RlUHJpbWFyeVJlc3BvbnNlIgAScAoRVW5kb0RlbW90ZVByaW1hcnkSKy50YWJsZXRtYW5hZ2VyZGF0YS5VbmRvRGVtb3RlUHJpbWFyeVJlcXVlc3QaLC50YWJsZXRtYW5hZ2VyZGF0YS5VbmRvRGVtb3RlUHJpbWFyeVJlc3BvbnNlIgAScwoSUmVwbGljYVdhc1Byb21vdGVkEiwudGFibGV0bWFuYWdlcmRhdGEuUmVwbGljYVdhc1Byb21vdGVkUmVxdWVzdBotLnRhYmxldG1hbmFnZXJkYXRhLlJlcGxpY2FXYXNQcm9tb3RlZFJlc3BvbnNlIgASiwEKGlJlc2V0UmVwbGljYXRpb25QYXJhbWV0ZXJzEjQudGFibGV0bWFuYWdlcmRhdGEuUmVzZXRSZXBsaWNhdGlvblBhcmFtZXRlcnNSZXF1ZXN0GjUudGFibGV0bWFuYWdlcmRhdGEuUmVzZXRSZXBsaWNhdGlvblBhcmFtZXRlcnNSZXNwb25zZSIAElsKCkZ1bGxTdGF0dXMSJC50YWJsZXRtYW5hZ2VyZGF0YS5GdWxsU3RhdHVzUmVxdWVzdBolLnRhYmxldG1hbmFnZXJkYXRhLkZ1bGxTdGF0dXNSZXNwb25zZSIAEnkKFFNldFJlcGxpY2F0aW9uU291cmNlEi4udGFibGV0bWFuYWdlcmRhdGEuU2V0UmVwbGljYXRpb25Tb3VyY2VSZXF1ZXN0Gi8udGFibGV0bWFuYWdlcmRhdGEuU2V0UmVwbGljYXRpb25Tb3VyY2VSZXNwb25zZSIAEnYKE1JlcGxpY2FXYXNSZXN0YXJ0ZWQSLS50YWJsZXRtYW5hZ2VyZGF0YS5SZXBsaWNhV2FzUmVzdGFydGVkUmVxdWVzdBouLnRhYmxldG1hbmFnZXJkYXRhLlJlcGxpY2FXYXNSZXN0YXJ0ZWRSZXNwb25zZSIAEo4BChtTdG9wUmVwbGljYXRpb25BbmRHZXRTdGF0dXMSNS50YWJsZXRtYW5hZ2VyZGF0YS5TdG9wUmVwbGljYXRpb25BbmRHZXRTdGF0dXNSZXF1ZXN0GjYudGFibGV0bWFuYWdlcmRhdGEuU3RvcFJlcGxpY2F0aW9uQW5kR2V0U3RhdHVzUmVzcG9uc2UiABJnCg5Qcm9tb3RlUmVwbGljYRIoLnRhYmxldG1hbmFnZXJkYXRhLlByb21vdGVSZXBsaWNhUmVxdWVzdBopLnRhYmxldG1hbmFnZXJkYXRhLlByb21vdGVSZXBsaWNhUmVzcG9uc2UiABJRCgZCYWNrdXASIC50YWJsZXRtYW5hZ2VyZGF0YS5CYWNrdXBSZXF1ZXN0GiEudGFibGV0bWFuYWdlcmRhdGEuQmFja3VwUmVzcG9uc2UiADABEnIKEVJlc3RvcmVGcm9tQmFja3VwEisudGFibGV0bWFuYWdlcmRhdGEuUmVzdG9yZUZyb21CYWNrdXBSZXF1ZXN0GiwudGFibGV0bWFuYWdlcmRhdGEuUmVzdG9yZUZyb21CYWNrdXBSZXNwb25zZSIAMAESZwoOQ2hlY2tUaHJvdHRsZXISKC50YWJsZXRtYW5hZ2VyZGF0YS5DaGVja1Rocm90dGxlclJlcXVlc3QaKS50YWJsZXRtYW5hZ2VyZGF0YS5DaGVja1Rocm90dGxlclJlc3BvbnNlIgAScwoSR2V0VGhyb3R0bGVyU3RhdHVzEiwudGFibGV0bWFuYWdlcmRhdGEuR2V0VGhyb3R0bGVyU3RhdHVzUmVxdWVzdBotLnRhYmxldG1hbmFnZXJkYXRhLkdldFRocm90dGxlclN0YXR1c1Jlc3BvbnNlIgBCM1oxdml0ZXNzLmlvL3ZpdGVzcy9nby92dC9wcm90by90YWJsZXRtYW5hZ2Vyc2VydmljZWIGcHJvdG8z", [file_tabletmanagerdata]);

/**
 * TabletManager is a service definition for tabletmanagerdata.TabletManager.
 *
 *
 * Various read-only methods
 *
 *
 * @generated from service tabletmanagerservice.TabletManager
 */
export const TabletManager: GenService<{
  /**
   * Ping returns the input payload
   *
   * @generated from rpc tabletmanagerservice.TabletManager.Ping
   */
  ping: {
    methodKind: "unary";
    input: typeof PingRequestSchema;
    output: typeof PingResponseSchema;
  },
  /**
   * Sleep sleeps for the provided duration
   *
   * @generated from rpc tabletmanagerservice.TabletManager.Sleep
   */
  sleep: {
    methodKind: "unary";
    input: typeof SleepRequestSchema;
    output: typeof SleepResponseSchema;
  },
  /**
   * ExecuteHook executes the hook remotely
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ExecuteHook
   */
  executeHook: {
    methodKind: "unary";
    input: typeof ExecuteHookRequestSchema;
    output: typeof ExecuteHookResponseSchema;
  },
  /**
   * GetSchema asks the tablet for its schema
   *
   * @generated from rpc tabletmanagerservice.TabletManager.GetSchema
   */
  getSchema: {
    methodKind: "unary";
    input: typeof GetSchemaRequestSchema;
    output: typeof GetSchemaResponseSchema;
  },
  /**
   * GetPermissions asks the tablet for its permissions
   *
   * @generated from rpc tabletmanagerservice.TabletManager.GetPermissions
   */
  getPermissions: {
    methodKind: "unary";
    input: typeof GetPermissionsRequestSchema;
    output: typeof GetPermissionsResponseSchema;
  },
  /**
   * GetGlobalStatusVars returns the server's global status variables asked for.
   * An empty/nil variable name parameter slice means you want all of them.
   *
   * @generated from rpc tabletmanagerservice.TabletManager.GetGlobalStatusVars
   */
  getGlobalStatusVars: {
    methodKind: "unary";
    input: typeof GetGlobalStatusVarsRequestSchema;
    output: typeof GetGlobalStatusVarsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.SetReadOnly
   */
  setReadOnly: {
    methodKind: "unary";
    input: typeof SetReadOnlyRequestSchema;
    output: typeof SetReadOnlyResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.SetReadWrite
   */
  setReadWrite: {
    methodKind: "unary";
    input: typeof SetReadWriteRequestSchema;
    output: typeof SetReadWriteResponseSchema;
  },
  /**
   * ChangeTags asks the remote tablet to change its tags
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ChangeTags
   */
  changeTags: {
    methodKind: "unary";
    input: typeof ChangeTagsRequestSchema;
    output: typeof ChangeTagsResponseSchema;
  },
  /**
   * ChangeType asks the remote tablet to change its type
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ChangeType
   */
  changeType: {
    methodKind: "unary";
    input: typeof ChangeTypeRequestSchema;
    output: typeof ChangeTypeResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.RefreshState
   */
  refreshState: {
    methodKind: "unary";
    input: typeof RefreshStateRequestSchema;
    output: typeof RefreshStateResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.RunHealthCheck
   */
  runHealthCheck: {
    methodKind: "unary";
    input: typeof RunHealthCheckRequestSchema;
    output: typeof RunHealthCheckResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ReloadSchema
   */
  reloadSchema: {
    methodKind: "unary";
    input: typeof ReloadSchemaRequestSchema;
    output: typeof ReloadSchemaResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.PreflightSchema
   */
  preflightSchema: {
    methodKind: "unary";
    input: typeof PreflightSchemaRequestSchema;
    output: typeof PreflightSchemaResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ApplySchema
   */
  applySchema: {
    methodKind: "unary";
    input: typeof ApplySchemaRequestSchema;
    output: typeof ApplySchemaResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ResetSequences
   */
  resetSequences: {
    methodKind: "unary";
    input: typeof ResetSequencesRequestSchema;
    output: typeof ResetSequencesResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.LockTables
   */
  lockTables: {
    methodKind: "unary";
    input: typeof LockTablesRequestSchema;
    output: typeof LockTablesResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.UnlockTables
   */
  unlockTables: {
    methodKind: "unary";
    input: typeof UnlockTablesRequestSchema;
    output: typeof UnlockTablesResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ExecuteQuery
   */
  executeQuery: {
    methodKind: "unary";
    input: typeof ExecuteQueryRequestSchema;
    output: typeof ExecuteQueryResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ExecuteFetchAsDba
   */
  executeFetchAsDba: {
    methodKind: "unary";
    input: typeof ExecuteFetchAsDbaRequestSchema;
    output: typeof ExecuteFetchAsDbaResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ExecuteMultiFetchAsDba
   */
  executeMultiFetchAsDba: {
    methodKind: "unary";
    input: typeof ExecuteMultiFetchAsDbaRequestSchema;
    output: typeof ExecuteMultiFetchAsDbaResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ExecuteFetchAsAllPrivs
   */
  executeFetchAsAllPrivs: {
    methodKind: "unary";
    input: typeof ExecuteFetchAsAllPrivsRequestSchema;
    output: typeof ExecuteFetchAsAllPrivsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ExecuteFetchAsApp
   */
  executeFetchAsApp: {
    methodKind: "unary";
    input: typeof ExecuteFetchAsAppRequestSchema;
    output: typeof ExecuteFetchAsAppResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.GetUnresolvedTransactions
   */
  getUnresolvedTransactions: {
    methodKind: "unary";
    input: typeof GetUnresolvedTransactionsRequestSchema;
    output: typeof GetUnresolvedTransactionsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ReadTransaction
   */
  readTransaction: {
    methodKind: "unary";
    input: typeof ReadTransactionRequestSchema;
    output: typeof ReadTransactionResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ConcludeTransaction
   */
  concludeTransaction: {
    methodKind: "unary";
    input: typeof ConcludeTransactionRequestSchema;
    output: typeof ConcludeTransactionResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.MysqlHostMetrics
   */
  mysqlHostMetrics: {
    methodKind: "unary";
    input: typeof MysqlHostMetricsRequestSchema;
    output: typeof MysqlHostMetricsResponseSchema;
  },
  /**
   * ReplicationStatus returns the current replication status.
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ReplicationStatus
   */
  replicationStatus: {
    methodKind: "unary";
    input: typeof ReplicationStatusRequestSchema;
    output: typeof ReplicationStatusResponseSchema;
  },
  /**
   * PrimaryStatus returns the current primary status.
   *
   * @generated from rpc tabletmanagerservice.TabletManager.PrimaryStatus
   */
  primaryStatus: {
    methodKind: "unary";
    input: typeof PrimaryStatusRequestSchema;
    output: typeof PrimaryStatusResponseSchema;
  },
  /**
   * PrimaryPosition returns the current primary position
   *
   * @generated from rpc tabletmanagerservice.TabletManager.PrimaryPosition
   */
  primaryPosition: {
    methodKind: "unary";
    input: typeof PrimaryPositionRequestSchema;
    output: typeof PrimaryPositionResponseSchema;
  },
  /**
   * WaitForPosition waits for the position to be reached
   *
   * @generated from rpc tabletmanagerservice.TabletManager.WaitForPosition
   */
  waitForPosition: {
    methodKind: "unary";
    input: typeof WaitForPositionRequestSchema;
    output: typeof WaitForPositionResponseSchema;
  },
  /**
   * StopReplication makes mysql stop its replication
   *
   * @generated from rpc tabletmanagerservice.TabletManager.StopReplication
   */
  stopReplication: {
    methodKind: "unary";
    input: typeof StopReplicationRequestSchema;
    output: typeof StopReplicationResponseSchema;
  },
  /**
   * StopReplicationMinimum stops the mysql replication after it reaches
   * the provided minimum point
   *
   * @generated from rpc tabletmanagerservice.TabletManager.StopReplicationMinimum
   */
  stopReplicationMinimum: {
    methodKind: "unary";
    input: typeof StopReplicationMinimumRequestSchema;
    output: typeof StopReplicationMinimumResponseSchema;
  },
  /**
   * StartReplication starts the mysql replication
   *
   * @generated from rpc tabletmanagerservice.TabletManager.StartReplication
   */
  startReplication: {
    methodKind: "unary";
    input: typeof StartReplicationRequestSchema;
    output: typeof StartReplicationResponseSchema;
  },
  /**
   * StartReplicationUnitAfter starts the mysql replication until and including
   * the provided position
   *
   * @generated from rpc tabletmanagerservice.TabletManager.StartReplicationUntilAfter
   */
  startReplicationUntilAfter: {
    methodKind: "unary";
    input: typeof StartReplicationUntilAfterRequestSchema;
    output: typeof StartReplicationUntilAfterResponseSchema;
  },
  /**
   * GetReplicas asks for the list of mysql replicas
   *
   * @generated from rpc tabletmanagerservice.TabletManager.GetReplicas
   */
  getReplicas: {
    methodKind: "unary";
    input: typeof GetReplicasRequestSchema;
    output: typeof GetReplicasResponseSchema;
  },
  /**
   * VReplication API
   *
   * @generated from rpc tabletmanagerservice.TabletManager.CreateVReplicationWorkflow
   */
  createVReplicationWorkflow: {
    methodKind: "unary";
    input: typeof CreateVReplicationWorkflowRequestSchema;
    output: typeof CreateVReplicationWorkflowResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.DeleteVReplicationWorkflow
   */
  deleteVReplicationWorkflow: {
    methodKind: "unary";
    input: typeof DeleteVReplicationWorkflowRequestSchema;
    output: typeof DeleteVReplicationWorkflowResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.HasVReplicationWorkflows
   */
  hasVReplicationWorkflows: {
    methodKind: "unary";
    input: typeof HasVReplicationWorkflowsRequestSchema;
    output: typeof HasVReplicationWorkflowsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ReadVReplicationWorkflow
   */
  readVReplicationWorkflow: {
    methodKind: "unary";
    input: typeof ReadVReplicationWorkflowRequestSchema;
    output: typeof ReadVReplicationWorkflowResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ReadVReplicationWorkflows
   */
  readVReplicationWorkflows: {
    methodKind: "unary";
    input: typeof ReadVReplicationWorkflowsRequestSchema;
    output: typeof ReadVReplicationWorkflowsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.UpdateVReplicationWorkflow
   */
  updateVReplicationWorkflow: {
    methodKind: "unary";
    input: typeof UpdateVReplicationWorkflowRequestSchema;
    output: typeof UpdateVReplicationWorkflowResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.UpdateVReplicationWorkflows
   */
  updateVReplicationWorkflows: {
    methodKind: "unary";
    input: typeof UpdateVReplicationWorkflowsRequestSchema;
    output: typeof UpdateVReplicationWorkflowsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.ValidateVReplicationPermissions
   */
  validateVReplicationPermissions: {
    methodKind: "unary";
    input: typeof ValidateVReplicationPermissionsRequestSchema;
    output: typeof ValidateVReplicationPermissionsResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.VReplicationExec
   */
  vReplicationExec: {
    methodKind: "unary";
    input: typeof VReplicationExecRequestSchema;
    output: typeof VReplicationExecResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.VReplicationWaitForPos
   */
  vReplicationWaitForPos: {
    methodKind: "unary";
    input: typeof VReplicationWaitForPosRequestSchema;
    output: typeof VReplicationWaitForPosResponseSchema;
  },
  /**
   * VDiff API
   *
   * @generated from rpc tabletmanagerservice.TabletManager.VDiff
   */
  vDiff: {
    methodKind: "unary";
    input: typeof VDiffRequestSchema;
    output: typeof VDiffResponseSchema;
  },
  /**
   * ResetReplication makes the target not replicating
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ResetReplication
   */
  resetReplication: {
    methodKind: "unary";
    input: typeof ResetReplicationRequestSchema;
    output: typeof ResetReplicationResponseSchema;
  },
  /**
   * InitPrimary initializes the tablet as a primary
   *
   * @generated from rpc tabletmanagerservice.TabletManager.InitPrimary
   */
  initPrimary: {
    methodKind: "unary";
    input: typeof InitPrimaryRequestSchema;
    output: typeof InitPrimaryResponseSchema;
  },
  /**
   * PopulateReparentJournal tells the tablet to add an entry to its
   * reparent journal
   *
   * @generated from rpc tabletmanagerservice.TabletManager.PopulateReparentJournal
   */
  populateReparentJournal: {
    methodKind: "unary";
    input: typeof PopulateReparentJournalRequestSchema;
    output: typeof PopulateReparentJournalResponseSchema;
  },
  /**
   * ReadReparentJournalInfo reads the information from reparent journal
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ReadReparentJournalInfo
   */
  readReparentJournalInfo: {
    methodKind: "unary";
    input: typeof ReadReparentJournalInfoRequestSchema;
    output: typeof ReadReparentJournalInfoResponseSchema;
  },
  /**
   * InitReplica tells the tablet to reparent to the primary unconditionally
   *
   * @generated from rpc tabletmanagerservice.TabletManager.InitReplica
   */
  initReplica: {
    methodKind: "unary";
    input: typeof InitReplicaRequestSchema;
    output: typeof InitReplicaResponseSchema;
  },
  /**
   * DemotePrimary tells the soon-to-be-former primary it's gonna change
   *
   * @generated from rpc tabletmanagerservice.TabletManager.DemotePrimary
   */
  demotePrimary: {
    methodKind: "unary";
    input: typeof DemotePrimaryRequestSchema;
    output: typeof DemotePrimaryResponseSchema;
  },
  /**
   * UndoDemotePrimary reverts all changes made by DemotePrimary
   *
   * @generated from rpc tabletmanagerservice.TabletManager.UndoDemotePrimary
   */
  undoDemotePrimary: {
    methodKind: "unary";
    input: typeof UndoDemotePrimaryRequestSchema;
    output: typeof UndoDemotePrimaryResponseSchema;
  },
  /**
   * ReplicaWasPromoted tells the remote tablet it is now the primary
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ReplicaWasPromoted
   */
  replicaWasPromoted: {
    methodKind: "unary";
    input: typeof ReplicaWasPromotedRequestSchema;
    output: typeof ReplicaWasPromotedResponseSchema;
  },
  /**
   * ResetReplicationParameters resets the replica replication parameters
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ResetReplicationParameters
   */
  resetReplicationParameters: {
    methodKind: "unary";
    input: typeof ResetReplicationParametersRequestSchema;
    output: typeof ResetReplicationParametersResponseSchema;
  },
  /**
   * FullStatus collects and returns the full status of MySQL including the replication information, semi-sync information, GTID information among others
   *
   * @generated from rpc tabletmanagerservice.TabletManager.FullStatus
   */
  fullStatus: {
    methodKind: "unary";
    input: typeof FullStatusRequestSchema;
    output: typeof FullStatusResponseSchema;
  },
  /**
   * SetReplicationSource tells the replica to reparent
   *
   * @generated from rpc tabletmanagerservice.TabletManager.SetReplicationSource
   */
  setReplicationSource: {
    methodKind: "unary";
    input: typeof SetReplicationSourceRequestSchema;
    output: typeof SetReplicationSourceResponseSchema;
  },
  /**
   * ReplicaWasRestarted tells the remote tablet its primary has changed
   *
   * @generated from rpc tabletmanagerservice.TabletManager.ReplicaWasRestarted
   */
  replicaWasRestarted: {
    methodKind: "unary";
    input: typeof ReplicaWasRestartedRequestSchema;
    output: typeof ReplicaWasRestartedResponseSchema;
  },
  /**
   * StopReplicationAndGetStatus stops MySQL replication, and returns the
   * replication status
   *
   * @generated from rpc tabletmanagerservice.TabletManager.StopReplicationAndGetStatus
   */
  stopReplicationAndGetStatus: {
    methodKind: "unary";
    input: typeof StopReplicationAndGetStatusRequestSchema;
    output: typeof StopReplicationAndGetStatusResponseSchema;
  },
  /**
   * PromoteReplica makes the replica the new primary
   *
   * @generated from rpc tabletmanagerservice.TabletManager.PromoteReplica
   */
  promoteReplica: {
    methodKind: "unary";
    input: typeof PromoteReplicaRequestSchema;
    output: typeof PromoteReplicaResponseSchema;
  },
  /**
   * @generated from rpc tabletmanagerservice.TabletManager.Backup
   */
  backup: {
    methodKind: "server_streaming";
    input: typeof BackupRequestSchema;
    output: typeof BackupResponseSchema;
  },
  /**
   * RestoreFromBackup deletes all local data and restores it from the latest backup.
   *
   * @generated from rpc tabletmanagerservice.TabletManager.RestoreFromBackup
   */
  restoreFromBackup: {
    methodKind: "server_streaming";
    input: typeof RestoreFromBackupRequestSchema;
    output: typeof RestoreFromBackupResponseSchema;
  },
  /**
   * CheckThrottler issues a 'check' on a tablet's throttler
   *
   * @generated from rpc tabletmanagerservice.TabletManager.CheckThrottler
   */
  checkThrottler: {
    methodKind: "unary";
    input: typeof CheckThrottlerRequestSchema;
    output: typeof CheckThrottlerResponseSchema;
  },
  /**
   * GetThrottlerStatus gets the status of a tablet throttler
   *
   * @generated from rpc tabletmanagerservice.TabletManager.GetThrottlerStatus
   */
  getThrottlerStatus: {
    methodKind: "unary";
    input: typeof GetThrottlerStatusRequestSchema;
    output: typeof GetThrottlerStatusResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_tabletmanagerservice, 0);

