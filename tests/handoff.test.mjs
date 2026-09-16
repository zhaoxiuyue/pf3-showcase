import { createHandoff } from '../demo/handoff.mjs';
import { registerHandoffContractTests } from '../conformance/handoff.mjs';

registerHandoffContractTests(createHandoff);
