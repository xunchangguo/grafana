import { sharedSingleStatMigrationHandler } from './SingleStatBaseOptions';

describe('sharedSingleStatMigrationHandler', () => {
  it('from old valueOptions model without pluginVersion', () => {
    const panel = {
      options: {
        valueOptions: {
          unit: 'watt',
          stat: 'last',
          decimals: 5,
        },
        minValue: 10,
        maxValue: 100,
        valueMappings: [{ type: 1, value: '1', text: 'OK' }],
        thresholds: [
          {
            color: 'green',
            index: 0,
            value: null,
          },
          {
            color: 'orange',
            index: 1,
            value: 40,
          },
          {
            color: 'red',
            index: 2,
            value: 80,
          },
        ],
      },
      title: 'Usage',
      type: 'bargauge',
    };

    sharedSingleStatMigrationHandler(panel as any);
    expect((panel as any).fieldConfig).toMatchInlineSnapshot(`
      Object {
        "defaults": Object {
          "color": Object {
            "mode": "thresholds",
          },
          "decimals": 5,
          "mappings": Array [
            Object {
              "text": "OK",
              "type": 1,
              "value": "1",
            },
          ],
          "max": 100,
          "min": 10,
          "thresholds": Object {
            "mode": "absolute",
            "steps": Array [
              Object {
                "color": "green",
                "index": 0,
                "value": -Infinity,
              },
              Object {
                "color": "orange",
                "index": 1,
                "value": 40,
              },
              Object {
                "color": "red",
                "index": 2,
                "value": 80,
              },
            ],
          },
          "unit": "watt",
        },
        "overrides": Array [],
      }
    `);
  });

  it('move thresholds to scale', () => {
    const panel = {
      options: {
        fieldOptions: {
          defaults: {
            thresholds: [
              {
                color: 'green',
                index: 0,
                value: null,
              },
              {
                color: 'orange',
                index: 1,
                value: 40,
              },
              {
                color: 'red',
                index: 2,
                value: 80,
              },
            ],
          },
        },
      },
    };

    sharedSingleStatMigrationHandler(panel as any);

    expect((panel as any).fieldConfig).toMatchInlineSnapshot(`
      Object {
        "defaults": Object {
          "mappings": undefined,
          "thresholds": undefined,
        },
        "overrides": Array [],
      }
    `);
  });

  it('Remove unused `overrides` option', () => {
    const panel = {
      options: {
        fieldOptions: {
          unit: 'watt',
          stat: 'last',
          decimals: 5,
          defaults: {
            min: 0,
            max: 100,
            mappings: [],
          },
          override: {
            min: 0,
            max: 100,
            mappings: [],
          },
        },
      },
      title: 'Usage',
      type: 'bargauge',
    };

    sharedSingleStatMigrationHandler(panel as any);
    expect((panel as any).fieldConfig).toMatchInlineSnapshot(`
      Object {
        "defaults": Object {
          "mappings": undefined,
          "max": 100,
          "min": 0,
          "thresholds": undefined,
        },
        "overrides": Array [],
      }
    `);
  });
});
