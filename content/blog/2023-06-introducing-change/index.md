---
title: Introducing Change to Teams
date: '2023-06-30'
---


One of the benefits of working in different teams is having the opportunity to learn different skills and practices. As people change teams, this gives opportunities to spread knowledge. Some might imagine it being a heroic pilgrimage where the enlightened and wise sage from another team brings their wealth of knowledge to a new team summoning forth a new age of productivity. But rarely are the transitions so smooth. Most people value stability and are hesitant to change. I recently introduced the use of feature flagging to my team and I’d like to use my journey to illustrate the key points in successfully introducing change. 

### Finding the opportunity

Until recently, my team had been operating pretty autonomously without much dependency on other teams. The workflow I inherited when joining the team worked well for the work we were doing. Last year, the team took on a migration project to replace a legacy system in our workflow. This was a complex initiative as it involved systems from multiple teams. Our changes required deployment coordination. The upstream and downstream systems needed to be in agreement on whether they were using the old or the new workflow. Our users also had to migrate to using the new system. This meant that our feature deployments also needed to be in sync with the process change management. We soon realized our development strategy was inadequate. 

The team was using Gitflow as our development branching strategy. Gitflow emphasized the use of feature branches to independently work on multiple features. The availability of a feature was generally determined by whether or not it was merged to the release branch. However, since the team had also adopted continuous deployment there was effectively no separate release branch. All merges to the main branch were promoted to production. 

There were attempts to schedule the development such that all the teams could build and deploy the features together. However, each team had tasks of different sizes and different resourcing. If we finished development but the other teams were not ready, we would need to wait to deploy. If it was the other way around, we would be the blocker slowing things down. We opted to complete development but not merge the features to the main branch until deployment. This resulted in some long-lived branches. When we were ready to deploy, there was additional effort required to ensure the old branch could be merged with the other new changes. The added complexity also introduced risks for regression. In one of our team retrospectives, it became clear that the team was unhappy with the constant delays in deployment and the effect it had on our zombie feature branches. I suggested we try an experiment with feature flagging. 

### Spiking it out

Feature flagging had been used by the team before, but it was not a common practice. In my previous teams, I had worked regularly with the technique. I had confidence that this would improve our workflow but the team would need to be onboard. I started by first giving a presentation to address the issue raised during retro. I explained the advantages of feature flagging and strived to push the team towards trying it out as a potential solution.

I set up a mob programming session with the entire team. The purpose of this session was to establish a standard on how we implemented feature flags in our projects. We wanted to understand the when, where and how of the implementation. I picked a relatively simple upcoming feature and we implemented it with feature flags during our mob session. I answered a number of questions regarding where to put the logic branch as well as where the flag would be stored. I also needed to assure the team that while duplication of code is normally a bad thing, in this case it is preferred as it makes removal of the code much simpler. After the session, the work served as a useful reference template for future changes. 

### Iterate

In an ideal scenario, everything would work and you’d get accolades and pats on the back. Realistically, most problems are complex and require multiple directions of attack. The team started implementing feature flags for all the upcoming work. Some features were clearly delineated from others, allowing easy separation of logic. However, we soon realized that a number of other changes were all centered on the same areas of code. To illustrate this, assume there’s feature A and feature B. With just one feature, there’s only two outcomes to account for – when feature A is on, and when it is off. With two nested features, there will be 4 scenarios. If there’s more, well good luck.


| Scenario | Feature A toggle state | Feature B toggle state |
| -------- | ---------------------- | ---------------------- |
| 1        | On                     | On                     |
| 2        | On                     | Off                    |
| 3        | Off                    | On                     |
| 4        | Off                    | Off                    |

We had a retrospective and decided that this complexity could be better dealt with by scheduling the nesting features in a later sprint or our estimates would need to reflect the overhead and potentially wasted effort. We also had a more formal meeting to refine our standards and patterns so that there was more certainty in our approach. Despite the shortcomings, the feeling was that this tool was a net benefit to the delivery of the project. 


To sum it up, if you’re looking to introduce a new tech initiative, here are a number of things to consider. 

* Timing and opportunity
  * If things are working well, it’s hard to argue for change – don’t fix what ain’t broke. 
  * Identify when it makes sense to introduce the change and clearly share the vision and benefits to gain support. 
* Start simple and small
  * Begin with a manageable implementation to demonstrate feasibility and benefits.
  * Address uncertainties by creating a proof of concept and setting standards for future implementation.
* Upskilling your team
  * Conduct collaborative sessions, such as swarm programming, to familiarize the team with the new technique.
  * Encourage questions and discussions to foster understanding and adoption.
* Iterate
  * What works for one team or project may not always work. Get feedback by asking questions through retrospectives to see what needs clarifying or improvment. 
  * Adjust the scope. Rarely does a single tool solve every problem. Understand where the tool works and doesn’t and come up with new solutions as needed. 


