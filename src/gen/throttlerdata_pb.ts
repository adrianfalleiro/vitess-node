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

// Data structures for the throttler RPC interface.

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,json_types=true"
// @generated from file throttlerdata.proto (package throttlerdata, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file throttlerdata.proto.
 */
export const file_throttlerdata: GenFile = /*@__PURE__*/
  fileDesc("ChN0aHJvdHRsZXJkYXRhLnByb3RvEg10aHJvdHRsZXJkYXRhIhEKD01heFJhdGVzUmVxdWVzdCJ7ChBNYXhSYXRlc1Jlc3BvbnNlEjkKBXJhdGVzGAEgAygLMioudGhyb3R0bGVyZGF0YS5NYXhSYXRlc1Jlc3BvbnNlLlJhdGVzRW50cnkaLAoKUmF0ZXNFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAM6AjgBIiEKEVNldE1heFJhdGVSZXF1ZXN0EgwKBHJhdGUYASABKAMiIwoSU2V0TWF4UmF0ZVJlc3BvbnNlEg0KBW5hbWVzGAEgAygJIugDCg1Db25maWd1cmF0aW9uEiIKGnRhcmdldF9yZXBsaWNhdGlvbl9sYWdfc2VjGAEgASgDEh8KF21heF9yZXBsaWNhdGlvbl9sYWdfc2VjGAIgASgDEhQKDGluaXRpYWxfcmF0ZRgDIAEoAxIUCgxtYXhfaW5jcmVhc2UYBCABKAESGgoSZW1lcmdlbmN5X2RlY3JlYXNlGAUgASgBEioKIm1pbl9kdXJhdGlvbl9iZXR3ZWVuX2luY3JlYXNlc19zZWMYBiABKAMSKgoibWF4X2R1cmF0aW9uX2JldHdlZW5faW5jcmVhc2VzX3NlYxgHIAEoAxIqCiJtaW5fZHVyYXRpb25fYmV0d2Vlbl9kZWNyZWFzZXNfc2VjGAggASgDEiEKGXNwcmVhZF9iYWNrbG9nX2Fjcm9zc19zZWMYCSABKAMSIQoZaWdub3JlX25fc2xvd2VzdF9yZXBsaWNhcxgKIAEoBRIgChhpZ25vcmVfbl9zbG93ZXN0X3Jkb25seXMYCyABKAUSHgoWYWdlX2JhZF9yYXRlX2FmdGVyX3NlYxgMIAEoAxIZChFiYWRfcmF0ZV9pbmNyZWFzZRgNIAEoARIjChttYXhfcmF0ZV9hcHByb2FjaF90aHJlc2hvbGQYDiABKAEiMQoXR2V0Q29uZmlndXJhdGlvblJlcXVlc3QSFgoOdGhyb3R0bGVyX25hbWUYASABKAkixAEKGEdldENvbmZpZ3VyYXRpb25SZXNwb25zZRJTCg5jb25maWd1cmF0aW9ucxgBIAMoCzI7LnRocm90dGxlcmRhdGEuR2V0Q29uZmlndXJhdGlvblJlc3BvbnNlLkNvbmZpZ3VyYXRpb25zRW50cnkaUwoTQ29uZmlndXJhdGlvbnNFbnRyeRILCgNrZXkYASABKAkSKwoFdmFsdWUYAiABKAsyHC50aHJvdHRsZXJkYXRhLkNvbmZpZ3VyYXRpb246AjgBIoMBChpVcGRhdGVDb25maWd1cmF0aW9uUmVxdWVzdBIWCg50aHJvdHRsZXJfbmFtZRgBIAEoCRIzCg1jb25maWd1cmF0aW9uGAIgASgLMhwudGhyb3R0bGVyZGF0YS5Db25maWd1cmF0aW9uEhgKEGNvcHlfemVyb192YWx1ZXMYAyABKAgiLAobVXBkYXRlQ29uZmlndXJhdGlvblJlc3BvbnNlEg0KBW5hbWVzGAEgAygJIjMKGVJlc2V0Q29uZmlndXJhdGlvblJlcXVlc3QSFgoOdGhyb3R0bGVyX25hbWUYASABKAkiKwoaUmVzZXRDb25maWd1cmF0aW9uUmVzcG9uc2USDQoFbmFtZXMYASADKAlCLFoqdml0ZXNzLmlvL3ZpdGVzcy9nby92dC9wcm90by90aHJvdHRsZXJkYXRhYgZwcm90bzM");

/**
 * MaxRatesRequest is the payload for the MaxRates RPC.
 *
 * @generated from message throttlerdata.MaxRatesRequest
 */
export type MaxRatesRequest = Message<"throttlerdata.MaxRatesRequest"> & {
};

/**
 * MaxRatesRequest is the payload for the MaxRates RPC.
 *
 * @generated from message throttlerdata.MaxRatesRequest
 */
export type MaxRatesRequestJson = {
};

/**
 * Describes the message throttlerdata.MaxRatesRequest.
 * Use `create(MaxRatesRequestSchema)` to create a new message.
 */
export const MaxRatesRequestSchema: GenMessage<MaxRatesRequest, MaxRatesRequestJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 0);

/**
 * MaxRatesResponse is returned by the MaxRates RPC.
 *
 * @generated from message throttlerdata.MaxRatesResponse
 */
export type MaxRatesResponse = Message<"throttlerdata.MaxRatesResponse"> & {
  /**
   * max_rates returns the max rate for each throttler. It's keyed by the
   * throttler name.
   *
   * @generated from field: map<string, int64> rates = 1;
   */
  rates: { [key: string]: bigint };
};

/**
 * MaxRatesResponse is returned by the MaxRates RPC.
 *
 * @generated from message throttlerdata.MaxRatesResponse
 */
export type MaxRatesResponseJson = {
  /**
   * max_rates returns the max rate for each throttler. It's keyed by the
   * throttler name.
   *
   * @generated from field: map<string, int64> rates = 1;
   */
  rates?: { [key: string]: string };
};

/**
 * Describes the message throttlerdata.MaxRatesResponse.
 * Use `create(MaxRatesResponseSchema)` to create a new message.
 */
export const MaxRatesResponseSchema: GenMessage<MaxRatesResponse, MaxRatesResponseJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 1);

/**
 * SetMaxRateRequest is the payload for the SetMaxRate RPC.
 *
 * @generated from message throttlerdata.SetMaxRateRequest
 */
export type SetMaxRateRequest = Message<"throttlerdata.SetMaxRateRequest"> & {
  /**
   * @generated from field: int64 rate = 1;
   */
  rate: bigint;
};

/**
 * SetMaxRateRequest is the payload for the SetMaxRate RPC.
 *
 * @generated from message throttlerdata.SetMaxRateRequest
 */
export type SetMaxRateRequestJson = {
  /**
   * @generated from field: int64 rate = 1;
   */
  rate?: string;
};

/**
 * Describes the message throttlerdata.SetMaxRateRequest.
 * Use `create(SetMaxRateRequestSchema)` to create a new message.
 */
export const SetMaxRateRequestSchema: GenMessage<SetMaxRateRequest, SetMaxRateRequestJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 2);

/**
 * SetMaxRateResponse is returned by the SetMaxRate RPC.
 *
 * @generated from message throttlerdata.SetMaxRateResponse
 */
export type SetMaxRateResponse = Message<"throttlerdata.SetMaxRateResponse"> & {
  /**
   * names is the list of throttler names which were updated.
   *
   * @generated from field: repeated string names = 1;
   */
  names: string[];
};

/**
 * SetMaxRateResponse is returned by the SetMaxRate RPC.
 *
 * @generated from message throttlerdata.SetMaxRateResponse
 */
export type SetMaxRateResponseJson = {
  /**
   * names is the list of throttler names which were updated.
   *
   * @generated from field: repeated string names = 1;
   */
  names?: string[];
};

/**
 * Describes the message throttlerdata.SetMaxRateResponse.
 * Use `create(SetMaxRateResponseSchema)` to create a new message.
 */
export const SetMaxRateResponseSchema: GenMessage<SetMaxRateResponse, SetMaxRateResponseJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 3);

/**
 * Configuration holds the configuration parameters for the
 * MaxReplicationLagModule which adaptively adjusts the throttling rate based on
 * the observed replication lag across all replicas.
 *
 * @generated from message throttlerdata.Configuration
 */
export type Configuration = Message<"throttlerdata.Configuration"> & {
  /**
   * target_replication_lag_sec is the replication lag (in seconds) the
   * MaxReplicationLagModule tries to aim for.
   * If it is within the target, it tries to increase the throttler
   * rate, otherwise it will lower it based on an educated guess of the
   * replica's throughput.
   *
   * @generated from field: int64 target_replication_lag_sec = 1;
   */
  targetReplicationLagSec: bigint;

  /**
   * max_replication_lag_sec is meant as a last resort.
   * By default, the module tries to find out the system maximum capacity while
   * trying to keep the replication lag around "target_replication_lag_sec".
   * Usually, we'll wait min_duration_between_(increases|decreases)_sec to see
   * the effect of a throttler rate change on the replication lag.
   * But if the lag goes above this field's value we will go into an "emergency"
   * state and throttle more aggressively (see "emergency_decrease" below).
   * This is the only way to ensure that the system will recover.
   *
   * @generated from field: int64 max_replication_lag_sec = 2;
   */
  maxReplicationLagSec: bigint;

  /**
   * initial_rate is the rate at which the module will start.
   *
   * @generated from field: int64 initial_rate = 3;
   */
  initialRate: bigint;

  /**
   * max_increase defines by how much we will increase the rate
   * e.g. 0.05 increases the rate by 5% while 1.0 by 100%.
   * Note that any increase will let the system wait for at least
   * (1 / MaxIncrease) seconds. If we wait for shorter periods of time, we
   * won't notice if the rate increase also increases the replication lag.
   * (If the system was already at its maximum capacity (e.g. 1k QPS) and we
   * increase the rate by e.g. 5% to 1050 QPS, it will take 20 seconds until
   * 1000 extra queries are buffered and the lag increases by 1 second.)
   *
   * @generated from field: double max_increase = 4;
   */
  maxIncrease: number;

  /**
   * emergency_decrease defines by how much we will decrease the current rate
   * if the observed replication lag is above "max_replication_lag_sec".
   * E.g. 0.50 decreases the current rate by 50%.
   *
   * @generated from field: double emergency_decrease = 5;
   */
  emergencyDecrease: number;

  /**
   * min_duration_between_increases_sec specifies how long we'll wait at least
   * for the last rate increase to have an effect on the system.
   *
   * @generated from field: int64 min_duration_between_increases_sec = 6;
   */
  minDurationBetweenIncreasesSec: bigint;

  /**
   * max_duration_between_increases_sec specifies how long we'll wait at most
   * for the last rate increase to have an effect on the system.
   *
   * @generated from field: int64 max_duration_between_increases_sec = 7;
   */
  maxDurationBetweenIncreasesSec: bigint;

  /**
   * min_duration_between_decreases_sec specifies how long we'll wait at least
   * for the last rate decrease to have an effect on the system.
   *
   * @generated from field: int64 min_duration_between_decreases_sec = 8;
   */
  minDurationBetweenDecreasesSec: bigint;

  /**
   * spread_backlog_across_sec is used when we set the throttler rate after
   * we guessed the rate of a replica and determined its backlog.
   * For example, at a guessed rate of 100 QPS and a lag of 10s, the replica has
   * a backlog of 1000 queries.
   * When we set the new, decreased throttler rate, we factor in how long it
   * will take the replica to go through the backlog (in addition to new
   * requests). This field specifies over which timespan we plan to spread this.
   * For example, for a backlog of 1000 queries spread over 5s means that we
   * have to further reduce the rate by 200 QPS or the backlog will not be
   * processed within the 5 seconds.
   *
   * @generated from field: int64 spread_backlog_across_sec = 9;
   */
  spreadBacklogAcrossSec: bigint;

  /**
   * ignore_n_slowest_replicas will ignore replication lag updates from the
   * N slowest REPLICA tablets. Under certain circumstances, replicas are still
   * considered e.g. a) if the lag is at most max_replication_lag_sec, b) there
   * are less than N+1 replicas or c) the lag increased on each replica such
   * that all replicas were ignored in a row.
   *
   * @generated from field: int32 ignore_n_slowest_replicas = 10;
   */
  ignoreNSlowestReplicas: number;

  /**
   * ignore_n_slowest_rdonlys does the same thing as ignore_n_slowest_replicas
   * but for RDONLY tablets. Note that these two settings are independent.
   *
   * @generated from field: int32 ignore_n_slowest_rdonlys = 11;
   */
  ignoreNSlowestRdonlys: number;

  /**
   * age_bad_rate_after_sec is the duration after which an unchanged bad rate
   * will "age out" and increase by "bad_rate_increase".
   * Bad rates are tracked by the code in memory.go and serve as an upper bound
   * for future rate changes. This ensures that the adaptive throttler does not
   * try known too high (bad) rates over and over again.
   * To avoid that temporary degradations permanently reduce the maximum rate,
   * a stable bad rate "ages out" after "age_bad_rate_after_sec".
   *
   * @generated from field: int64 age_bad_rate_after_sec = 12;
   */
  ageBadRateAfterSec: bigint;

  /**
   * bad_rate_increase defines the percentage by which a bad rate will be
   * increased when it's aging out.
   *
   * @generated from field: double bad_rate_increase = 13;
   */
  badRateIncrease: number;

  /**
   * max_rate_approach_threshold is the fraction of the current rate limit that the actual
   * rate must exceed for the throttler to increase the limit when the replication lag
   * is below target_replication_lag_sec. For example, assuming the actual replication lag
   * is below target_replication_lag_sec, if the current rate limit is 100, then the actual
   * rate must exceed 100*max_rate_approach_threshold for the throttler to increase the current
   * limit.
   *
   * @generated from field: double max_rate_approach_threshold = 14;
   */
  maxRateApproachThreshold: number;
};

/**
 * Configuration holds the configuration parameters for the
 * MaxReplicationLagModule which adaptively adjusts the throttling rate based on
 * the observed replication lag across all replicas.
 *
 * @generated from message throttlerdata.Configuration
 */
export type ConfigurationJson = {
  /**
   * target_replication_lag_sec is the replication lag (in seconds) the
   * MaxReplicationLagModule tries to aim for.
   * If it is within the target, it tries to increase the throttler
   * rate, otherwise it will lower it based on an educated guess of the
   * replica's throughput.
   *
   * @generated from field: int64 target_replication_lag_sec = 1;
   */
  targetReplicationLagSec?: string;

  /**
   * max_replication_lag_sec is meant as a last resort.
   * By default, the module tries to find out the system maximum capacity while
   * trying to keep the replication lag around "target_replication_lag_sec".
   * Usually, we'll wait min_duration_between_(increases|decreases)_sec to see
   * the effect of a throttler rate change on the replication lag.
   * But if the lag goes above this field's value we will go into an "emergency"
   * state and throttle more aggressively (see "emergency_decrease" below).
   * This is the only way to ensure that the system will recover.
   *
   * @generated from field: int64 max_replication_lag_sec = 2;
   */
  maxReplicationLagSec?: string;

  /**
   * initial_rate is the rate at which the module will start.
   *
   * @generated from field: int64 initial_rate = 3;
   */
  initialRate?: string;

  /**
   * max_increase defines by how much we will increase the rate
   * e.g. 0.05 increases the rate by 5% while 1.0 by 100%.
   * Note that any increase will let the system wait for at least
   * (1 / MaxIncrease) seconds. If we wait for shorter periods of time, we
   * won't notice if the rate increase also increases the replication lag.
   * (If the system was already at its maximum capacity (e.g. 1k QPS) and we
   * increase the rate by e.g. 5% to 1050 QPS, it will take 20 seconds until
   * 1000 extra queries are buffered and the lag increases by 1 second.)
   *
   * @generated from field: double max_increase = 4;
   */
  maxIncrease?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * emergency_decrease defines by how much we will decrease the current rate
   * if the observed replication lag is above "max_replication_lag_sec".
   * E.g. 0.50 decreases the current rate by 50%.
   *
   * @generated from field: double emergency_decrease = 5;
   */
  emergencyDecrease?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * min_duration_between_increases_sec specifies how long we'll wait at least
   * for the last rate increase to have an effect on the system.
   *
   * @generated from field: int64 min_duration_between_increases_sec = 6;
   */
  minDurationBetweenIncreasesSec?: string;

  /**
   * max_duration_between_increases_sec specifies how long we'll wait at most
   * for the last rate increase to have an effect on the system.
   *
   * @generated from field: int64 max_duration_between_increases_sec = 7;
   */
  maxDurationBetweenIncreasesSec?: string;

  /**
   * min_duration_between_decreases_sec specifies how long we'll wait at least
   * for the last rate decrease to have an effect on the system.
   *
   * @generated from field: int64 min_duration_between_decreases_sec = 8;
   */
  minDurationBetweenDecreasesSec?: string;

  /**
   * spread_backlog_across_sec is used when we set the throttler rate after
   * we guessed the rate of a replica and determined its backlog.
   * For example, at a guessed rate of 100 QPS and a lag of 10s, the replica has
   * a backlog of 1000 queries.
   * When we set the new, decreased throttler rate, we factor in how long it
   * will take the replica to go through the backlog (in addition to new
   * requests). This field specifies over which timespan we plan to spread this.
   * For example, for a backlog of 1000 queries spread over 5s means that we
   * have to further reduce the rate by 200 QPS or the backlog will not be
   * processed within the 5 seconds.
   *
   * @generated from field: int64 spread_backlog_across_sec = 9;
   */
  spreadBacklogAcrossSec?: string;

  /**
   * ignore_n_slowest_replicas will ignore replication lag updates from the
   * N slowest REPLICA tablets. Under certain circumstances, replicas are still
   * considered e.g. a) if the lag is at most max_replication_lag_sec, b) there
   * are less than N+1 replicas or c) the lag increased on each replica such
   * that all replicas were ignored in a row.
   *
   * @generated from field: int32 ignore_n_slowest_replicas = 10;
   */
  ignoreNSlowestReplicas?: number;

  /**
   * ignore_n_slowest_rdonlys does the same thing as ignore_n_slowest_replicas
   * but for RDONLY tablets. Note that these two settings are independent.
   *
   * @generated from field: int32 ignore_n_slowest_rdonlys = 11;
   */
  ignoreNSlowestRdonlys?: number;

  /**
   * age_bad_rate_after_sec is the duration after which an unchanged bad rate
   * will "age out" and increase by "bad_rate_increase".
   * Bad rates are tracked by the code in memory.go and serve as an upper bound
   * for future rate changes. This ensures that the adaptive throttler does not
   * try known too high (bad) rates over and over again.
   * To avoid that temporary degradations permanently reduce the maximum rate,
   * a stable bad rate "ages out" after "age_bad_rate_after_sec".
   *
   * @generated from field: int64 age_bad_rate_after_sec = 12;
   */
  ageBadRateAfterSec?: string;

  /**
   * bad_rate_increase defines the percentage by which a bad rate will be
   * increased when it's aging out.
   *
   * @generated from field: double bad_rate_increase = 13;
   */
  badRateIncrease?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * max_rate_approach_threshold is the fraction of the current rate limit that the actual
   * rate must exceed for the throttler to increase the limit when the replication lag
   * is below target_replication_lag_sec. For example, assuming the actual replication lag
   * is below target_replication_lag_sec, if the current rate limit is 100, then the actual
   * rate must exceed 100*max_rate_approach_threshold for the throttler to increase the current
   * limit.
   *
   * @generated from field: double max_rate_approach_threshold = 14;
   */
  maxRateApproachThreshold?: number | "NaN" | "Infinity" | "-Infinity";
};

/**
 * Describes the message throttlerdata.Configuration.
 * Use `create(ConfigurationSchema)` to create a new message.
 */
export const ConfigurationSchema: GenMessage<Configuration, ConfigurationJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 4);

/**
 * GetConfigurationRequest is the payload for the GetConfiguration RPC.
 *
 * @generated from message throttlerdata.GetConfigurationRequest
 */
export type GetConfigurationRequest = Message<"throttlerdata.GetConfigurationRequest"> & {
  /**
   * throttler_name specifies which throttler to select. If empty, all active
   * throttlers will be selected.
   *
   * @generated from field: string throttler_name = 1;
   */
  throttlerName: string;
};

/**
 * GetConfigurationRequest is the payload for the GetConfiguration RPC.
 *
 * @generated from message throttlerdata.GetConfigurationRequest
 */
export type GetConfigurationRequestJson = {
  /**
   * throttler_name specifies which throttler to select. If empty, all active
   * throttlers will be selected.
   *
   * @generated from field: string throttler_name = 1;
   */
  throttlerName?: string;
};

/**
 * Describes the message throttlerdata.GetConfigurationRequest.
 * Use `create(GetConfigurationRequestSchema)` to create a new message.
 */
export const GetConfigurationRequestSchema: GenMessage<GetConfigurationRequest, GetConfigurationRequestJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 5);

/**
 * GetConfigurationResponse is returned by the GetConfiguration RPC.
 *
 * @generated from message throttlerdata.GetConfigurationResponse
 */
export type GetConfigurationResponse = Message<"throttlerdata.GetConfigurationResponse"> & {
  /**
   * max_rates returns the configurations for each throttler.
   * It's keyed by the throttler name.
   *
   * @generated from field: map<string, throttlerdata.Configuration> configurations = 1;
   */
  configurations: { [key: string]: Configuration };
};

/**
 * GetConfigurationResponse is returned by the GetConfiguration RPC.
 *
 * @generated from message throttlerdata.GetConfigurationResponse
 */
export type GetConfigurationResponseJson = {
  /**
   * max_rates returns the configurations for each throttler.
   * It's keyed by the throttler name.
   *
   * @generated from field: map<string, throttlerdata.Configuration> configurations = 1;
   */
  configurations?: { [key: string]: ConfigurationJson };
};

/**
 * Describes the message throttlerdata.GetConfigurationResponse.
 * Use `create(GetConfigurationResponseSchema)` to create a new message.
 */
export const GetConfigurationResponseSchema: GenMessage<GetConfigurationResponse, GetConfigurationResponseJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 6);

/**
 * UpdateConfigurationRequest is the payload for the UpdateConfiguration RPC.
 *
 * @generated from message throttlerdata.UpdateConfigurationRequest
 */
export type UpdateConfigurationRequest = Message<"throttlerdata.UpdateConfigurationRequest"> & {
  /**
   * throttler_name specifies which throttler to update. If empty, all active
   * throttlers will be updated.
   *
   * @generated from field: string throttler_name = 1;
   */
  throttlerName: string;

  /**
   * configuration is the new (partial) configuration.
   *
   * @generated from field: throttlerdata.Configuration configuration = 2;
   */
  configuration?: Configuration;

  /**
   * copy_zero_values specifies whether fields with zero values should be copied
   * as well.
   *
   * @generated from field: bool copy_zero_values = 3;
   */
  copyZeroValues: boolean;
};

/**
 * UpdateConfigurationRequest is the payload for the UpdateConfiguration RPC.
 *
 * @generated from message throttlerdata.UpdateConfigurationRequest
 */
export type UpdateConfigurationRequestJson = {
  /**
   * throttler_name specifies which throttler to update. If empty, all active
   * throttlers will be updated.
   *
   * @generated from field: string throttler_name = 1;
   */
  throttlerName?: string;

  /**
   * configuration is the new (partial) configuration.
   *
   * @generated from field: throttlerdata.Configuration configuration = 2;
   */
  configuration?: ConfigurationJson;

  /**
   * copy_zero_values specifies whether fields with zero values should be copied
   * as well.
   *
   * @generated from field: bool copy_zero_values = 3;
   */
  copyZeroValues?: boolean;
};

/**
 * Describes the message throttlerdata.UpdateConfigurationRequest.
 * Use `create(UpdateConfigurationRequestSchema)` to create a new message.
 */
export const UpdateConfigurationRequestSchema: GenMessage<UpdateConfigurationRequest, UpdateConfigurationRequestJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 7);

/**
 * UpdateConfigurationResponse is returned by the UpdateConfiguration RPC.
 *
 * @generated from message throttlerdata.UpdateConfigurationResponse
 */
export type UpdateConfigurationResponse = Message<"throttlerdata.UpdateConfigurationResponse"> & {
  /**
   * names is the list of throttler names which were updated.
   *
   * @generated from field: repeated string names = 1;
   */
  names: string[];
};

/**
 * UpdateConfigurationResponse is returned by the UpdateConfiguration RPC.
 *
 * @generated from message throttlerdata.UpdateConfigurationResponse
 */
export type UpdateConfigurationResponseJson = {
  /**
   * names is the list of throttler names which were updated.
   *
   * @generated from field: repeated string names = 1;
   */
  names?: string[];
};

/**
 * Describes the message throttlerdata.UpdateConfigurationResponse.
 * Use `create(UpdateConfigurationResponseSchema)` to create a new message.
 */
export const UpdateConfigurationResponseSchema: GenMessage<UpdateConfigurationResponse, UpdateConfigurationResponseJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 8);

/**
 * ResetConfigurationRequest is the payload for the ResetConfiguration RPC.
 *
 * @generated from message throttlerdata.ResetConfigurationRequest
 */
export type ResetConfigurationRequest = Message<"throttlerdata.ResetConfigurationRequest"> & {
  /**
   * throttler_name specifies which throttler to reset. If empty, all active
   * throttlers will be reset.
   *
   * @generated from field: string throttler_name = 1;
   */
  throttlerName: string;
};

/**
 * ResetConfigurationRequest is the payload for the ResetConfiguration RPC.
 *
 * @generated from message throttlerdata.ResetConfigurationRequest
 */
export type ResetConfigurationRequestJson = {
  /**
   * throttler_name specifies which throttler to reset. If empty, all active
   * throttlers will be reset.
   *
   * @generated from field: string throttler_name = 1;
   */
  throttlerName?: string;
};

/**
 * Describes the message throttlerdata.ResetConfigurationRequest.
 * Use `create(ResetConfigurationRequestSchema)` to create a new message.
 */
export const ResetConfigurationRequestSchema: GenMessage<ResetConfigurationRequest, ResetConfigurationRequestJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 9);

/**
 * ResetConfigurationResponse is returned by the ResetConfiguration RPC.
 *
 * @generated from message throttlerdata.ResetConfigurationResponse
 */
export type ResetConfigurationResponse = Message<"throttlerdata.ResetConfigurationResponse"> & {
  /**
   * names is the list of throttler names which were updated.
   *
   * @generated from field: repeated string names = 1;
   */
  names: string[];
};

/**
 * ResetConfigurationResponse is returned by the ResetConfiguration RPC.
 *
 * @generated from message throttlerdata.ResetConfigurationResponse
 */
export type ResetConfigurationResponseJson = {
  /**
   * names is the list of throttler names which were updated.
   *
   * @generated from field: repeated string names = 1;
   */
  names?: string[];
};

/**
 * Describes the message throttlerdata.ResetConfigurationResponse.
 * Use `create(ResetConfigurationResponseSchema)` to create a new message.
 */
export const ResetConfigurationResponseSchema: GenMessage<ResetConfigurationResponse, ResetConfigurationResponseJson> = /*@__PURE__*/
  messageDesc(file_throttlerdata, 10);

