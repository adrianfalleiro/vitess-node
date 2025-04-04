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
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Throttler } from "./throttlerservice";
import type { ResetConfigurationResponse } from "./throttlerdata";
import type { ResetConfigurationRequest } from "./throttlerdata";
import type { UpdateConfigurationResponse } from "./throttlerdata";
import type { UpdateConfigurationRequest } from "./throttlerdata";
import type { GetConfigurationResponse } from "./throttlerdata";
import type { GetConfigurationRequest } from "./throttlerdata";
import type { SetMaxRateResponse } from "./throttlerdata";
import type { SetMaxRateRequest } from "./throttlerdata";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { MaxRatesResponse } from "./throttlerdata";
import type { MaxRatesRequest } from "./throttlerdata";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * Throttler defines the throttler RPC calls.
 *
 * @generated from protobuf service throttlerservice.Throttler
 */
export interface IThrottlerClient {
    /**
     * MaxRates returns the current max rate for each throttler of the process.
     *
     * @generated from protobuf rpc: MaxRates(throttlerdata.MaxRatesRequest) returns (throttlerdata.MaxRatesResponse);
     */
    maxRates(input: MaxRatesRequest, options?: RpcOptions): UnaryCall<MaxRatesRequest, MaxRatesResponse>;
    /**
     * SetMaxRate allows to change the current max rate for all throttlers
     * of the process.
     *
     * @generated from protobuf rpc: SetMaxRate(throttlerdata.SetMaxRateRequest) returns (throttlerdata.SetMaxRateResponse);
     */
    setMaxRate(input: SetMaxRateRequest, options?: RpcOptions): UnaryCall<SetMaxRateRequest, SetMaxRateResponse>;
    /**
     * GetConfiguration returns the configuration of the MaxReplicationlag module
     * for the given throttler or all throttlers if "throttler_name" is empty.
     *
     * @generated from protobuf rpc: GetConfiguration(throttlerdata.GetConfigurationRequest) returns (throttlerdata.GetConfigurationResponse);
     */
    getConfiguration(input: GetConfigurationRequest, options?: RpcOptions): UnaryCall<GetConfigurationRequest, GetConfigurationResponse>;
    /**
     * UpdateConfiguration (partially) updates the configuration of the
     * MaxReplicationlag module for the given throttler or all throttlers if
     * "throttler_name" is empty.
     * If "copy_zero_values" is true, fields with zero values will be copied
     * as well.
     *
     * @generated from protobuf rpc: UpdateConfiguration(throttlerdata.UpdateConfigurationRequest) returns (throttlerdata.UpdateConfigurationResponse);
     */
    updateConfiguration(input: UpdateConfigurationRequest, options?: RpcOptions): UnaryCall<UpdateConfigurationRequest, UpdateConfigurationResponse>;
    /**
     * ResetConfiguration resets the configuration of the MaxReplicationlag module
     * to the initial configuration for the given throttler or all throttlers if
     * "throttler_name" is empty.
     *
     * @generated from protobuf rpc: ResetConfiguration(throttlerdata.ResetConfigurationRequest) returns (throttlerdata.ResetConfigurationResponse);
     */
    resetConfiguration(input: ResetConfigurationRequest, options?: RpcOptions): UnaryCall<ResetConfigurationRequest, ResetConfigurationResponse>;
}
/**
 * Throttler defines the throttler RPC calls.
 *
 * @generated from protobuf service throttlerservice.Throttler
 */
export class ThrottlerClient implements IThrottlerClient, ServiceInfo {
    typeName = Throttler.typeName;
    methods = Throttler.methods;
    options = Throttler.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * MaxRates returns the current max rate for each throttler of the process.
     *
     * @generated from protobuf rpc: MaxRates(throttlerdata.MaxRatesRequest) returns (throttlerdata.MaxRatesResponse);
     */
    maxRates(input: MaxRatesRequest, options?: RpcOptions): UnaryCall<MaxRatesRequest, MaxRatesResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<MaxRatesRequest, MaxRatesResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * SetMaxRate allows to change the current max rate for all throttlers
     * of the process.
     *
     * @generated from protobuf rpc: SetMaxRate(throttlerdata.SetMaxRateRequest) returns (throttlerdata.SetMaxRateResponse);
     */
    setMaxRate(input: SetMaxRateRequest, options?: RpcOptions): UnaryCall<SetMaxRateRequest, SetMaxRateResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetMaxRateRequest, SetMaxRateResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * GetConfiguration returns the configuration of the MaxReplicationlag module
     * for the given throttler or all throttlers if "throttler_name" is empty.
     *
     * @generated from protobuf rpc: GetConfiguration(throttlerdata.GetConfigurationRequest) returns (throttlerdata.GetConfigurationResponse);
     */
    getConfiguration(input: GetConfigurationRequest, options?: RpcOptions): UnaryCall<GetConfigurationRequest, GetConfigurationResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetConfigurationRequest, GetConfigurationResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * UpdateConfiguration (partially) updates the configuration of the
     * MaxReplicationlag module for the given throttler or all throttlers if
     * "throttler_name" is empty.
     * If "copy_zero_values" is true, fields with zero values will be copied
     * as well.
     *
     * @generated from protobuf rpc: UpdateConfiguration(throttlerdata.UpdateConfigurationRequest) returns (throttlerdata.UpdateConfigurationResponse);
     */
    updateConfiguration(input: UpdateConfigurationRequest, options?: RpcOptions): UnaryCall<UpdateConfigurationRequest, UpdateConfigurationResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateConfigurationRequest, UpdateConfigurationResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * ResetConfiguration resets the configuration of the MaxReplicationlag module
     * to the initial configuration for the given throttler or all throttlers if
     * "throttler_name" is empty.
     *
     * @generated from protobuf rpc: ResetConfiguration(throttlerdata.ResetConfigurationRequest) returns (throttlerdata.ResetConfigurationResponse);
     */
    resetConfiguration(input: ResetConfigurationRequest, options?: RpcOptions): UnaryCall<ResetConfigurationRequest, ResetConfigurationResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<ResetConfigurationRequest, ResetConfigurationResponse>("unary", this._transport, method, opt, input);
    }
}
