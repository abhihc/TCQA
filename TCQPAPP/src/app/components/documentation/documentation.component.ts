import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface QualityModelElementNode {
  name: string;
  children?: QualityModelElementNode[];
}

const TEST_CASE_QUALITY_MODEL: QualityModelElementNode[] = [
  {
    name: 'Test Effectivity',
    children: [
      { name: 'Test Coverage' },
      { name: 'Test Correctness' },
      { name: 'Fault-Revealing Capability' },
      { name: 'Test Confidence' },
      { name: 'Test Effectivity Compliance' }
    ]
  }, {
    name: 'Reliability',
    children: [
      { name: 'Test Repeatability' },
      { name: 'Maturity' },
      { name: 'Fault-Tolerance' },
      { name: 'Recoverability' },
      { name: 'Reliability Compliance' }
    ]
  }, {
    name: 'Usability',
    children: [
      { name: 'Understandability' },
      { name: 'Learnability' },
      { name: 'Operability' },
      { name: 'Test Evaluability' },
      { name: 'Usability Compliance' }
    ]
  }, {
    name: 'Efficiency',
    children: [
      { name: 'Time Behaviour' },
      { name: 'Resource Utilisation' },
      { name: 'Efficiency Compliance' }
    ]
  }, {
    name: 'Security',
    children: [
      { name: 'Confidentiality' },
      { name: 'Accountability' },
      { name: 'Security Compliance' }
    ]
  }, {
    name: 'Maintainability',
    children: [
      { name: 'Analysability' },
      { name: 'Changeability' },
      { name: 'Stability' },
      { name: 'Maintainability Compliance' }
    ]
  }, {
    name: 'Portability',
    children: [
      { name: 'Adaptability' },
      { name: 'Installability' },
      { name: 'Portability Compliance' }
    ]
  }, {
    name: 'Reusability',
    children: [
      { name: 'Coupling' },
      { name: 'Flexibility' },
      { name: 'Reusability Compliance' }
    ]
  },
];

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  treeControl = new NestedTreeControl<QualityModelElementNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<QualityModelElementNode>();

  constructor() {
    this.dataSource.data = TEST_CASE_QUALITY_MODEL;
  }

  hasChild = (_: number, node: QualityModelElementNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

}
