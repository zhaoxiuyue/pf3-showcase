// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import { createFrozenHandoff } from './fixtures/frozen-detached-output.mjs';
import { registerHandoffContractTests } from '../conformance/handoff.mjs';

registerHandoffContractTests(createFrozenHandoff);
