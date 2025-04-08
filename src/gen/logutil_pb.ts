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

// This package contains the data structures for the logging service.

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,json_types=true"
// @generated from file logutil.proto (package logutil, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Time, TimeJson } from "./vttime_pb";
import { file_vttime } from "./vttime_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file logutil.proto.
 */
export const file_logutil: GenFile = /*@__PURE__*/
  fileDesc("Cg1sb2d1dGlsLnByb3RvEgdsb2d1dGlsIm0KBUV2ZW50EhoKBHRpbWUYASABKAsyDC52dHRpbWUuVGltZRIdCgVsZXZlbBgCIAEoDjIOLmxvZ3V0aWwuTGV2ZWwSDAoEZmlsZRgDIAEoCRIMCgRsaW5lGAQgASgDEg0KBXZhbHVlGAUgASgJKjYKBUxldmVsEggKBElORk8QABILCgdXQVJOSU5HEAESCQoFRVJST1IQAhILCgdDT05TT0xFEANCJlokdml0ZXNzLmlvL3ZpdGVzcy9nby92dC9wcm90by9sb2d1dGlsYgZwcm90bzM", [file_vttime]);

/**
 * Event is a single logging event
 *
 * @generated from message logutil.Event
 */
export type Event = Message<"logutil.Event"> & {
  /**
   * @generated from field: vttime.Time time = 1;
   */
  time?: Time;

  /**
   * @generated from field: logutil.Level level = 2;
   */
  level: Level;

  /**
   * @generated from field: string file = 3;
   */
  file: string;

  /**
   * @generated from field: int64 line = 4;
   */
  line: bigint;

  /**
   * @generated from field: string value = 5;
   */
  value: string;
};

/**
 * Event is a single logging event
 *
 * @generated from message logutil.Event
 */
export type EventJson = {
  /**
   * @generated from field: vttime.Time time = 1;
   */
  time?: TimeJson;

  /**
   * @generated from field: logutil.Level level = 2;
   */
  level?: LevelJson;

  /**
   * @generated from field: string file = 3;
   */
  file?: string;

  /**
   * @generated from field: int64 line = 4;
   */
  line?: string;

  /**
   * @generated from field: string value = 5;
   */
  value?: string;
};

/**
 * Describes the message logutil.Event.
 * Use `create(EventSchema)` to create a new message.
 */
export const EventSchema: GenMessage<Event, EventJson> = /*@__PURE__*/
  messageDesc(file_logutil, 0);

/**
 * Level is the level of the log messages.
 *
 * @generated from enum logutil.Level
 */
export enum Level {
  /**
   * The usual logging levels.
   * Should be logged using logging facility.
   *
   * @generated from enum value: INFO = 0;
   */
  INFO = 0,

  /**
   * @generated from enum value: WARNING = 1;
   */
  WARNING = 1,

  /**
   * @generated from enum value: ERROR = 2;
   */
  ERROR = 2,

  /**
   * For messages that may contains non-logging events.
   * Should be logged to console directly.
   *
   * @generated from enum value: CONSOLE = 3;
   */
  CONSOLE = 3,
}

/**
 * Level is the level of the log messages.
 *
 * @generated from enum logutil.Level
 */
export type LevelJson = "INFO" | "WARNING" | "ERROR" | "CONSOLE";

/**
 * Describes the enum logutil.Level.
 */
export const LevelSchema: GenEnum<Level, LevelJson> = /*@__PURE__*/
  enumDesc(file_logutil, 0);

