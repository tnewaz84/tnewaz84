import type { BlockchainNetwork } from "./blockchain-calculator"

interface CalculateRewardsParams {
  network: BlockchainNetwork
  tokenPrice: number
  cpuCores: number
  ramGB: number
  storageGB: number
  bandwidthMbps: number
  uptimePercentage: number
}

export function calculateRewards(params: CalculateRewardsParams) {
  const { network, tokenPrice, cpuCores, ramGB, storageGB, bandwidthMbps, uptimePercentage } = params

  // Base reward calculation based on network type
  let baseReward = 0

  switch (network.resourceType) {
    case "compute":
      // For compute-focused networks, CPU and RAM are most important
      baseReward = (cpuCores * 0.05 + ramGB * 0.02) * network.rewardRate
      break
    case "storage":
      // For storage-focused networks, storage capacity is most important
      baseReward = storageGB * 0.0005 * network.rewardRate
      break
    case "bandwidth":
      // For bandwidth-focused networks, internet speed is most important
      baseReward = bandwidthMbps * 0.001 * network.rewardRate
      break
  }

  // Apply difficulty factor
  const difficultyAdjustedReward = baseReward / network.difficulty

  // Apply uptime percentage
  const uptimeAdjustedReward = difficultyAdjustedReward * (uptimePercentage / 100)

  // Calculate daily rewards
  const dailyTokens = uptimeAdjustedReward
  const dailyUsd = dailyTokens * tokenPrice

  // Calculate weekly and monthly rewards
  const weeklyTokens = dailyTokens * 7
  const weeklyUsd = dailyUsd * 7

  const monthlyTokens = dailyTokens * 30
  const monthlyUsd = dailyUsd * 30

  return {
    daily: {
      tokens: dailyTokens,
      usd: dailyUsd,
    },
    weekly: {
      tokens: weeklyTokens,
      usd: weeklyUsd,
    },
    monthly: {
      tokens: monthlyTokens,
      usd: monthlyUsd,
    },
  }
}

