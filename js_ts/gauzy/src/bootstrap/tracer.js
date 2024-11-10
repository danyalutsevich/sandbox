'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const exporter_trace_otlp_grpc_1 = require("@opentelemetry/exporter-trace-otlp-grpc");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const instrumentation_nestjs_core_1 = require("@opentelemetry/instrumentation-nestjs-core");
const instrumentation_redis_1 = require("@opentelemetry/instrumentation-redis");
const instrumentation_pg_1 = require("@opentelemetry/instrumentation-pg");
const instrumentation_mysql2_1 = require("@opentelemetry/instrumentation-mysql2");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const opentelemetry_node_1 = require("@honeycombio/opentelemetry-node");
const api_1 = require("@opentelemetry/api");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const opentelemetry_instrumentation_typeorm_1 = require("opentelemetry-instrumentation-typeorm");
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const instrumentation_1 = require("@opentelemetry/instrumentation");
// import { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';
const isConsole = false; // Set to true to use console exporter only (for debugging)
const isAuto = true; // Set to true to use auto-instrumentations
let provider;
let honeycombSDK;
let instrumentations;
let traceExporter;
let url;
if (process.env.OTEL_ENABLED === 'true') {
    if (process.env.NODE_ENV === 'development') {
        // Enable Tracing logging for debugging
        api_1.diag.setLogger(new api_1.DiagConsoleLogger(), api_1.DiagLogLevel.DEBUG);
    }
    let serviceName;
    if (process.env.OTEL_SERVICE_NAME) {
        serviceName = process.env.OTEL_SERVICE_NAME;
    }
    else {
        let sName = 'Ever Gauzy API';
        if (process.env.CLOUD_PROVIDER) {
            const providerName = process.env.CLOUD_PROVIDER;
            console.log('Tracing Cloud Provider: ' + providerName);
            sName = sName + '-' + providerName;
        }
        // Function to format serviceName
        const formatServiceName = function (name) {
            // Convert to lowercase
            let formattedName = name.toLowerCase();
            // Replace spaces and special characters with hyphens
            formattedName = formattedName.replace(/[\s\W-]+/g, '-');
            return formattedName;
        };
        serviceName = formatServiceName(sName);
    }
    console.log('Tracing service name: ' + serviceName);
    provider = new sdk_trace_node_1.NodeTracerProvider({
        resource: new resources_1.Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: serviceName
        })
    });
    provider.register();
    url = process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
    // If OTEL_PROVIDER is not set, use Jaeger by default (as long as OTEL_ENABLED is true of course)
    if (!process.env.OTEL_PROVIDER || process.env.OTEL_PROVIDER === 'jaeger') {
        const isGrpc = process.env.OTEL_EXPORTER_OTLP_PROTOCOL === 'grpc';
        // Configure the SDK to export telemetry data to a locally running Jaeger by default, unless OTEL_EXPORTER_OTLP_TRACES_ENDPOINT is set
        if (!url)
            url = isGrpc ? 'grpc://localhost:14250' : 'http://localhost:14268/api/traces';
        const exporterOptions = {
            url: url,
            serviceName: serviceName
        };
        if (!isGrpc) {
            traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter(exporterOptions);
        }
        else {
            traceExporter = new exporter_trace_otlp_grpc_1.OTLPTraceExporter(exporterOptions);
        }
        console.log('Tracing Enabled with Jaeger');
    }
    if (process.env.OTEL_PROVIDER === 'aspecto') {
        if (!url)
            url = 'https://otelcol.aspecto.io/v1/traces';
        const exporterOptions = {
            url: url,
            serviceName: serviceName,
            headers: {
                Authorization: process.env.ASPECTO_API_KEY
            }
        };
        traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter(exporterOptions);
        console.log('Tracing Enabled with Aspecto');
    }
    if (process.env.OTEL_PROVIDER === 'signoz') {
        // Important for Tracing with SigNoz:
        // 1. Define env var - OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=<SIGNOZ_INGESTION_KEY>"
        // 2. Set OTEL_ENABLED=true
        // Read docs: https://signoz.io/docs/instrumentation/nestjs
        if (!url)
            url = 'https://ingest.us.signoz.cloud:443/v1/traces';
        const exporterOptions = {
            url: url,
            serviceName: serviceName
        };
        traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter(exporterOptions);
        console.log('Tracing Enabled with SigNoz');
    }
    if (process.env.OTEL_PROVIDER === 'honeycomb') {
        if (!url)
            url = `https://api.honeycomb.io/v1/traces`;
        console.log('Using Honeycomb API Key: ' + process.env.HONEYCOMB_API_KEY);
        const exporterOptions = {
            url: url,
            serviceName: serviceName,
            headers: {
                'x-honeycomb-team': process.env.HONEYCOMB_API_KEY
            }
        };
        // https://docs.honeycomb.io/getting-data-in/opentelemetry/node-distro/
        traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter(exporterOptions);
        console.log('Tracing Enabled with Honeycomb');
    }
    if (process.env.OTEL_PROVIDER === 'zipkin') {
        if (!url)
            url = 'http://localhost:9411/api/v2/spans';
        const exporterOptions = {
            url: url,
            serviceName: serviceName
        };
        traceExporter = new exporter_zipkin_1.ZipkinExporter(exporterOptions);
        console.log('Tracing Enabled with Zipkin runnung on URL: ' + url);
    }
    console.log('Tracing URL: ' + url);
    console.log('Tracing Headers: ' + process.env.OTEL_EXPORTER_OTLP_HEADERS);
    let spanProcessor;
    if (process.env.NODE_ENV === `development`) {
        spanProcessor = new sdk_trace_base_1.SimpleSpanProcessor(traceExporter);
    }
    else {
        spanProcessor = new sdk_trace_base_1.BatchSpanProcessor(traceExporter);
    }
    let instrumentationNames;
    if (isAuto) {
        const autoInst = (0, auto_instrumentations_node_1.getNodeAutoInstrumentations)({
            // we recommend disabling fs autoinstrumentation since it can be noisy
            // and expensive during startup
            '@opentelemetry/instrumentation-fs': {
                enabled: false
            },
            '@opentelemetry/instrumentation-net': {
                enabled: false
            },
            '@opentelemetry/instrumentation-dns': {
                enabled: false
            }
        });
        instrumentations = [autoInst];
        instrumentationNames = autoInst.map((i) => i.instrumentationName);
        if (process.env.DB_ORM === 'typeorm') {
            instrumentations.push(new opentelemetry_instrumentation_typeorm_1.TypeormInstrumentation());
            instrumentationNames.push('TypeormInstrumentation');
        }
    }
    else {
        const ins = [];
        const insNames = [];
        ins.push(new instrumentation_http_1.HttpInstrumentation());
        insNames.push('HttpInstrumentation');
        ins.push(new instrumentation_express_1.ExpressInstrumentation());
        insNames.push('ExpressInstrumentation');
        ins.push(new instrumentation_nestjs_core_1.NestInstrumentation());
        insNames.push('NestInstrumentation');
        if (process.env.REDIS_ENABLED === 'true') {
            ins.push(new instrumentation_redis_1.RedisInstrumentation());
            insNames.push('RedisInstrumentation');
        }
        if (process.env.DB_TYPE === 'postgres') {
            ins.push(new instrumentation_pg_1.PgInstrumentation());
            insNames.push('PgInstrumentation');
        }
        if (process.env.DB_TYPE === 'mysql') {
            ins.push(new instrumentation_mysql2_1.MySQL2Instrumentation());
            insNames.push('MySQL2Instrumentation');
        }
        if (process.env.DB_ORM === 'typeorm') {
            ins.push(new opentelemetry_instrumentation_typeorm_1.TypeormInstrumentation());
            insNames.push('TypeormInstrumentation');
        }
        instrumentations = [ins];
        instrumentationNames = insNames;
    }
    console.log('Tracing Enabled Instrumentations:', instrumentationNames.join(', '));
    if (process.env.OTEL_PROVIDER === 'honeycomb') {
        if (process.env.HONEYCOMB_API_KEY) {
            /*
            const metricReader = new PeriodicExportingMetricReader({
                    exporter: new ConsoleMetricExporter()
            });
            */
            const params = {
                apiKey: process.env.HONEYCOMB_API_KEY,
                serviceName: serviceName,
                instrumentations: instrumentations,
                // metricReader: metricReader,
                localVisualizations: process.env.NODE_ENV === 'development' ||
                    process.env.HONEYCOMB_ENABLE_LOCAL_VISUALIZATIONS === 'true'
            };
            if (isConsole) {
                params.traceExporter = new sdk_trace_base_1.ConsoleSpanExporter();
            }
            else {
                params.spanProcessor = spanProcessor;
            }
            honeycombSDK = new opentelemetry_node_1.HoneycombSDK(params);
            console.log('Tracing SDK initialized for Honeycomb');
        }
        else {
            console.warn('Honeycomb API Key is not set');
        }
    }
    else {
        /*
        const metricReader = new PeriodicExportingMetricReader({
            exporter: new ConsoleMetricExporter()
        });
        */
        const params = {
            serviceName: serviceName,
            // metricReader: metricReader,
            instrumentations: instrumentations
        };
        if (isConsole) {
            params.traceExporter = new sdk_trace_base_1.ConsoleSpanExporter();
        }
        else {
            params.spanProcessor = spanProcessor;
        }
        provider.addSpanProcessor(spanProcessor);
        console.log('Tracing SDK initialized');
    }
}
exports.default = {
    start: () => {
        if (process.env.OTEL_ENABLED === 'true') {
            if (provider) {
                (0, instrumentation_1.registerInstrumentations)({
                    instrumentations: instrumentations
                });
            }
            if (honeycombSDK) {
                honeycombSDK.start();
            }
        }
    },
    shutdown: async () => {
        if (process.env.OTEL_ENABLED === 'true') {
            await provider?.shutdown();
            await honeycombSDK?.shutdown();
        }
    }
};
//# sourceMappingURL=tracer.js.map