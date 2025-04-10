import { createClient } from "@connectrpc/connect";
import { type GrpcTransportOptions, createGrpcTransport } from "@connectrpc/connect-node";
import { UpdateStream } from "../gen/binlogservice_pb";
import { Query } from "../gen/queryservice_pb";
import { TabletManager } from "../gen/tabletmanagerservice_pb";
import { Throttler } from "../gen/throttlerservice_pb";
import { Vtctl, Vtctld } from "../gen/vtctlservice_pb";
import { Vitess } from "../gen/vtgateservice_pb";

export function createVitessClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(Vitess, transport);
}

export function createUpdateStreamClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(UpdateStream, transport);
}

export function createVtctlClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(Vtctl, transport);
}

export function createVtctldClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(Vtctld, transport);
}

export function createThrottlerClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(Throttler, transport);
}

export function createTabletManagerClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(TabletManager, transport);
}

export function createQueryClient(options: GrpcTransportOptions) {
  const transport = createGrpcTransport(options);
  return createClient(Query, transport);
}
