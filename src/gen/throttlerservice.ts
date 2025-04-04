// @generated by protobuf-ts 2.9.6 with parameter long_type_bigint
// @generated from protobuf file "throttlerservice.proto" (package "throttlerservice", syntax proto3)
// tslint:disable
//
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
//
//
// gRPC RPC interface for the internal resharding throttler (go/vt/throttler)
// which is used by vreplication.
//
import { ResetConfigurationResponse } from "./throttlerdata";
import { ResetConfigurationRequest } from "./throttlerdata";
import { UpdateConfigurationResponse } from "./throttlerdata";
import { UpdateConfigurationRequest } from "./throttlerdata";
import { GetConfigurationResponse } from "./throttlerdata";
import { GetConfigurationRequest } from "./throttlerdata";
import { SetMaxRateResponse } from "./throttlerdata";
import { SetMaxRateRequest } from "./throttlerdata";
import { MaxRatesResponse } from "./throttlerdata";
import { MaxRatesRequest } from "./throttlerdata";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service throttlerservice.Throttler
 */
export const Throttler = new ServiceType("throttlerservice.Throttler", [
    { name: "MaxRates", options: {}, I: MaxRatesRequest, O: MaxRatesResponse },
    { name: "SetMaxRate", options: {}, I: SetMaxRateRequest, O: SetMaxRateResponse },
    { name: "GetConfiguration", options: {}, I: GetConfigurationRequest, O: GetConfigurationResponse },
    { name: "UpdateConfiguration", options: {}, I: UpdateConfigurationRequest, O: UpdateConfigurationResponse },
    { name: "ResetConfiguration", options: {}, I: ResetConfigurationRequest, O: ResetConfigurationResponse }
]);
